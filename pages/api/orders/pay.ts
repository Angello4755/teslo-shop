import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IPaypal } from 'src/core/pay/entity';
import Order from 'src/infra/database/Order/models/Order';
import * as mongoDB from '../../../src/infra/database/mongoDB';

type Data = {
    message: string
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case "POST":
            return payOrder(req, res);
            
        default:
           return res.status(400).json({ message: 'Bad request' })
    }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const paypalBearerToken = await getPayBearerToken();

    if(!paypalBearerToken) {
        return res.status(400).json({ message: 'token null' })
    }

    const {transactionId = '', orderId = '' } = req.body;

    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
        headers: {
            'Authorization': `Bearer ${paypalBearerToken}`  
        }
    });

     if(data.status !== 'COMPLETED') return res.status(401).json({ message: 'Orden no pagada' });

     await mongoDB.connect();

     const dbOrder = await Order.findById(orderId);


     if(!dbOrder) {
        await mongoDB.disconnect();
        return res.status(401).json({ message: 'Orden no existe' });
     }

     if(dbOrder.cartSummary?.total !== Number(data.purchase_units[0].amount.value) ) {
        await mongoDB.disconnect();
        return res.status(401).json({ message: 'Valores pagados invalidos' });
     }

     dbOrder.transactionId = transactionId;
     dbOrder.isPaid = true;

     await dbOrder.save();

     await mongoDB.disconnect();

    return res.status(200).json({ message: 'Orden pagada' })
}

const getPayBearerToken = async (): Promise<string | null > => {
    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');

    const body = new URLSearchParams('grant_type=client_credentials');

    try {
        const {data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${base64Token}`, 
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return data.access_token;

    } catch (error) {
        if( axios.isAxiosError(error)) {
            console.log( error.response?.data);
        } else {
            console.log(error);
        }
        return null;
    }
}
