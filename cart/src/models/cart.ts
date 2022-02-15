import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface CartAttrs {
    products: {
        productId: string;
        quantity: number
    }[];
    userId: string;
}

interface CartDoc extends mongoose.Document {
    products: {
        productId: string;
        quantity: number
    }[];
    userId: string;
    version: number;
}

interface CartModel extends mongoose.Model<CartDoc>{
    build(attrs: CartAttrs): CartDoc;
}

const cartSchema = new mongoose.Schema({
    products: {
        type: {
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number
        },
        ref: 'Product'
    },
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
    timestamps: true
});

cartSchema.set('versionKey', 'version');
cartSchema.plugin(updateIfCurrentPlugin);

cartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart(attrs);
}

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart };