import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface CartAttrs {
    id: string;
    products: {
        id: string;
        title: string;
        price: number;
        quantity: number;
    }[],
    userId: string;
}

export interface CartDoc extends mongoose.Document {
    products: {
        id: string;
        title: string;
        price: number;
        quantity: number;
    }[];
    userId: string;
    version: number;
}

interface CartModel extends mongoose.Model<CartDoc>{
    build(attrs: CartAttrs): CartDoc;
}

const CartSchema = new mongoose.Schema({
    products: {
        type: Object,
        required: true
    },
    userId: {
        type: String,
        required: true
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
        products: attrs.products,
        userId: attrs.userId,
    });
}

const Cart = mongoose.model<CartDoc, CartModel>('Cart', CartSchema);

export { Cart };