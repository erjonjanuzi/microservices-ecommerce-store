import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ProductDoc } from './product';

interface CartAttrs {
    // products: {
    //     productId: string;
    //     quantity: number
    // }[];
    userId: string;
}

interface CartDoc extends mongoose.Document {
    products: {
        product: ProductDoc;
        quantity: number;
    }[];
    userId: string;
    version: number;
}

interface CartModel extends mongoose.Model<CartDoc>{
    build(attrs: CartAttrs): CartDoc;
}

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    // products: [new mongoose.Schema({
    //     product: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Product'
    //     },
    //     quantity: {
    //         type: Number
    //     }
    // })],
    userId: {
        type: String,
        required: true
    }
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    },
})

cartSchema.set('versionKey', 'version');
cartSchema.plugin(updateIfCurrentPlugin);

cartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart(attrs);
}

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart };