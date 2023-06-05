import type { NextApiRequest, NextApiResponse } from "next";
import { Product as IProduct } from "src/core/product/entity/Products";
import * as mongoDB from "../../../src/infra/database/mongoDB";
import Product from "../../../src/infra/database/products/models/Product";
import { isValidObjectId } from "mongoose";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data =
  | {
      message: string;
    }
  | IProduct[]
  | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "POST":
      return createProduct(req, res);
    case "PUT":
      return updateProduct(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await mongoDB.connect();
  const products = await Product.find().sort({ title: "asc" }).lean();
  const updateProducts = products.map((product) => {
    product.images = getImages(product.images);
    return product;
  });
  await mongoDB.disconnect();
  return res.status(200).json(updateProducts);
};

const getImages = (images: string[]) => {
  return images.map((image) => {
    return image.includes("https")
      ? image
      : `${process.env.HOST_NAME}products/${image}`;
  });
};
const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id))
    return res
      .status(400)
      .json({ message: "El id del producto nos es valido" });

  if (images.length < 2)
    return res.status(400).json({ message: "Es necesario dos imagenes" });
  // TODO: posiblemente tendremos un localhost:300/
  try {
    await mongoDB.connect();
    const product = await Product.findById(_id);

    if (!product) {
      await mongoDB.disconnect();
      return res
        .status(400)
        .json({ message: "No existe producto con este id" });
    }

    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId, extension] = image
          .substring(image.lastIndexOf("/") + 1)
          .split(".");
        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.updateOne(req.body);
    await mongoDB.disconnect();
    return res.status(200).json({ message: "Producto guardado con exito" });
  } catch (error) {
    console.log(error);
    await mongoDB.disconnect();
    return res.status(400).json({ message: "Error" });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2)
    return res
      .status(400)
      .json({ message: "Es necesario almenos dos imagenes" });

  try {
    await mongoDB.connect();
    const productInDB = await Product.findOne({ slug: req.body.slug });
    if (productInDB) {
      await mongoDB.disconnect();
      return res.status(400).json({ message: "El producto ya existe" });
    }
    const product = new Product(req.body);
    product.save();
    await mongoDB.disconnect();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await mongoDB.disconnect();
    return res.status(400).json({ message: "Error" });
  }
};
