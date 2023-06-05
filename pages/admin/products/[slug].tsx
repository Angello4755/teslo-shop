import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { AdminLayout } from "src/view/layouts";
import { Product as IProduct } from "src/core/product/entity/Products";
import { ProviderProducts } from "src/infra/provider/providerProducts";
import Product from "src/infra/database/products/models/Product";
import { useRouter } from "next/router";
import tesloApi from "src/infra/database/auth/api/tesloApi";

const validTypes = ["shirts", "pants", "hoodies", "hats"];
const validGender = ["men", "women", "kid", "unisex"];
const validSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: string;
}

interface Props {
  product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name !== "title") return;
      const newSlug =
        value.title
          ?.trim()
          .replaceAll(" ", "_")
          .replaceAll("'", "")
          .toLocaleLowerCase() || "";
      setValue("slug", newSlug);
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const [newTagValue, setNewTagValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const onNewTag = () => {
    setNewTagValue("");
    if (newTagValue.trim() === "") return;
    const tags = getValues("tags");
    if (tags.includes(newTagValue)) return;
    tags.push(newTagValue);
  };

  const onDeleteTag = (tag: string) => {
    const tags = getValues("tags").filter((t) => t !== tag);
    setValue("tags", tags, { shouldValidate: true });
  };

  const onChangeSize = (size: string) => {
    const currentSizes = getValues("sizes");
    if (currentSizes.includes(size)) {
      setValue(
        "sizes",
        currentSizes.filter((s) => s !== size),
        { shouldValidate: true }
      );
      return;
    }
    currentSizes.push(size);
    setValue("sizes", currentSizes, { shouldValidate: true });
  };

  const provider = new ProviderProducts();

  const saveProduct = provider.get_SaveProduct();

  const router = useRouter();

  const onSubmit = async (form: FormData) => {
    console.log(form);
    if (form.images.length < 2) return;
    setIsSaving(true);
    const resp = await saveProduct.execute(form as IProduct);
    if (!form._id) {
      setIsSaving(false);
      router.replace(`/admin/products/${form.slug}`);
    } else {
      setIsSaving(false);
    }
    console.log(resp);
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;
    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await tesloApi.post<{ message: string }>(
          "/admin/upload",
          formData
        );
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteImage = (image: string) => {
    const imagesFiltred = getValues("images").filter((img) => img !== image);
    console.log(imagesFiltred);
    setValue("images", imagesFiltred, {
      shouldValidate: true,
    });
  };

  return (
    <AdminLayout
      title={"Producto"}
      subTitle={`Editando: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px" }}
            type="submit"
            disabled={isSaving}
          >
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Título"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("title", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Descripción"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register("description", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Inventario"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("inStock", {
                required: "Este campo es requerido",
                min: { value: 0, message: "Minimo de valor cero" },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Precio"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("price", {
                required: "Este campo es requerido",
                min: { value: 0, message: "Minimo de valor cero" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                value={getValues("type")}
                onChange={({ target }) =>
                  setValue("type", target.value, { shouldValidate: true })
                }
              >
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                value={getValues("gender")}
                onChange={({ target }) =>
                  setValue("gender", target.value, { shouldValidate: true })
                }
              >
                {validGender.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Tallas</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      checked={getValues("sizes").includes(size)}
                      onChange={() => onChangeSize(size)}
                    />
                  }
                  label={size}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register("slug", {
                required: "Este campo es requerido",
                validate: (val) =>
                  val.trim().includes(" ")
                    ? " No puede tener espacios en blanco"
                    : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Etiquetas"
              variant="filled"
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value)}
              fullWidth
              onKeyUp={({ code, target }) =>
                code === "Space" ? onNewTag() : ""
              }
              sx={{ mb: 1 }}
              helperText="Presiona [spacebar] para agregar"
            />

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {getValues("tags").map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
                sx={{ mb: 3 }}
                onClick={() => fileInputRef.current?.click()}
              >
                Cargar imagen
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png,image/gif,image/jpeg"
                style={{ display: "none" }}
                onChange={onFilesSelected}
              />

              <Chip
                label="Es necesario al 2 imagenes"
                color="error"
                variant="outlined"
                sx={{
                  display: getValues("images").length < 2 ? "flex" : "none",
                }}
              />

              <Grid container spacing={2}>
                {getValues("images").map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={img}
                        alt={img}
                      />
                      <CardActions>
                        <Button
                          fullWidth
                          color="error"
                          onClick={() => onDeleteImage(img)}
                        >
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;

  let product: IProduct | null;

  if (slug === "new") {
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = ["img1.jpg", "img2.jpg"];
    product = tempProduct;
  } else {
    const providerProducts = new ProviderProducts();
    const getProductBySlug = providerProducts.get_GetProductBySlug();
    product = await getProductBySlug.execute(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
