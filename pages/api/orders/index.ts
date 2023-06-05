import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from 'src/core/product/entity';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import * as mongoDB from '../../../src/infra/database/mongoDB';
import { Product } from 'src/infra/database/products';
import Order from 'src/infra/database/Order/models/Order';
type Data = {
    message: string
} | IOrder | {}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

   
    switch (req.method) {
        case "POST":
            return createOrder(req, res);
            break;  
        default:
            res.status(400).json({ message: 'Example' })
            break;
    }
}

const  createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

   const { orderItems, cartSummary } = req.body as IOrder;

   const session: any = await getServerSession(req, res, authOptions);
   //Verificar la sesion del usuario
   if(!session) {
        return res.status(401).json({message: 'Debe estar autenticado'});
   }

   // Crear un arreglo con los productos

   const productsIds = orderItems.map( product => product._id );

   await mongoDB.connect();


   const dbProducts = await Product.find({ _id: { $in: productsIds }});

   try {
    
    const subTotal = orderItems.reduce(
        (prev, current) => {
            const currentPrice = dbProducts.find( prod => prod.id === current._id)!.price;
            if(!currentPrice) throw new Error("Verifique el carrito de nuevo, producto no existe");

           return ( currentPrice * current.quantity ) + prev
        },
        0
      );

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * ( taxRate + 1 );
    if( Number(cartSummary!.total).toFixed(2) !== Number(backendTotal).toFixed(2) ) {
        throw new Error("El total no cuadra");
    }

    const userId = session.user._id;

    const newOrder = new Order({...req.body, isPaid: false, user: userId});
    newOrder.cartSummary!.total = Math.round(newOrder.cartSummary!.total*100 ) / 100;
    await newOrder.save();
    await mongoDB.connect();
    return res.status(201).json(newOrder)

   } catch (error: any) {
        await mongoDB.connect();
        return res.status(400).json({
            message: error.message || 'Revise los logs del server'
        })
   }
}

