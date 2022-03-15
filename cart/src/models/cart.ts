import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ProductDoc } from './product';

interface CartAttrs {
    userId: string;
}

interface CartDoc extends mongoose.Document {
    products: {
        product: ProductDoc;
        quantity: number;
    }[];
    userId: string;
    version: number;
    calculateTotalPrice(): number
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

cartSchema.methods.calculateTotalPrice = function () {
    const totalPrice: number = this.products.forEach((product: ProductDoc) => {
        return product.price * product.sale * product.quantity
    })
    return totalPrice;
}

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart };