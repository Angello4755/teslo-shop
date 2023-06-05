import mongoose, { Model } from 'mongoose';
import { IOrder } from 'src/core/product/entity';
const { Schema, model, models } = mongoose;

const OrderSchema = new Schema({
    user     : { type: Schema.Types.ObjectId, ref: 'User', required: true},
    orderItems: [{
        _id     : { type: Schema.Types.ObjectId, ref: 'Product', required: true},
        title   : { type: String, required: true},
        size    : { type: String, required: true},
        quantity: { type: Number, required: true},
        slug    : { type: String, required: true},
        image   : { type: String, required: true},
        price   : { type: Number, required: true},
    }],
    cartSummary: {
        numberOfItems: { type: Number, required: true},
        subTotal: { type: Number, required: true},
        tax: { type: Number, required: true},
        total: { type: Number, required: true},
        taxRate: { type: Number, required: true},
        shippingAddres: {
            name: { type: String, required: true},
            surnames: { type: String, required: true},
            address: { type: String, required: true},
            address2: { type: String},
            city: { type: String, required: true},
            country: { type: String, required: true},
            postalCode: { type: String, required: true},
            phone: { type: String, required: true},
        },  
    },
    paymentResult: { type: String},
    isPaid: { type: Boolean, required: true, default: false},
    paidAt: { type: String },
    transactionId: { type: String }

}, {
    timestamps: true
})


const Order: Model<IOrder> = models?.Order || model('Order', OrderSchema );

export default Order;