import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface CartAttrs {
    id: string;
    title: string;
    price: number;
    quantity: number;
    sale: number;
}

export interface CartDoc extends mongoose.Document {
    title: string;
    price: number;
    quantity: number;
    sale: number;
    version: number;
}

interface CartModel extends mongoose.Model<CartDoc>{
    build(attrs: CartAttrs): CartDoc;
}

const CartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true
    },
    sale: {
        type: Number,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

CartSchema.set('versionKey', 'version');
CartSchema.plugin(updateIfCurrentPlugin);

CartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
        quantity: attrs.quantity,
        sale: attrs.sale
    });
}

const Cart = mongoose.model<CartDoc, CartModel>('Cart', CartSchema);

export { Cart };