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
    totalPrice: number;
    calculateTotalPrice(): number
}

interface CartModel extends mongoose.Model<CartDoc> {
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
    userId: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    },
})

cartSchema.set('versionKey', 'version');
cartSchema.plugin(updateIfCurrentPlugin);

cartSchema.pre('save', async function (done) {
    this.set('totalPrice', this.calculateTotalPrice());
    done();
});

cartSchema.methods.calculateTotalPrice = function () {
    let totalPrice = 0

    this.products.forEach((item: { product: ProductDoc, quantity: number }) => {
        totalPrice += ((item.product.price - (item.product.price * (item.product.sale / 100))) * item.quantity);
    })

    return totalPrice;
}

cartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart(attrs);
}

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart };