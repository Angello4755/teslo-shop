import mongoose, {Model, Schema, model, models } from 'mongoose';
import { IUser } from 'src/core/product/entity';


const userSchema = new Schema({
    name     : { type: String, required: true},
    email   : { type: String, required: true, unique: true},
    password : { type: String, required: true,},
    role: {
        type: String,
        enum: { 
            values: ['admin', 'client', 'super-user', 'SEO'],
            message: '{VALUE} no es un role válido',
            default: 'cliente',
            required: true
         }
    }
}, {
    timestamps: true
})

const User: Model<IUser> =  models?.User || model('User', userSchema );

export default User;