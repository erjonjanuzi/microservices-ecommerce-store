import { OrderStatus } from '@labcourseapp/common';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ProductDoc } from './product';
const AutoIncrement = require('mongoose-sequence')(mongoose)

interface OrderAttrs {
    products: {
        product: ProductDoc;
        quantity: number;
    }[];
    contact: {
        billingAddress: {
            country: string,
            city: string,
            postCode: string,
            street: string,
        },
        deliveryAddress: {
            country: string,
            city: string,
            postCode: string,
            street: string,
        },
        email: string,
        phoneNumber: string,
        firstName: string;
        lastName: string;
    }
    status: string;
    userId?: string;
    expiresAt: Date;
}

export interface OrderDoc extends mongoose.Document {
    calculateTotalPrice(): number;
    orderNo: number;
    products: {
        product: {
            id: string;
            title: string;
            image: string;
            price: number;
            quantity: number;
            sale: number;
        };
        quantity: number;
    }[];
    contact: {
        billingAddress: {
            country: string,
            city: string,
            postCode: string,
            street: string,
        },
        deliveryAddress: {
            country: string,
            city: string,
            postCode: string,
            street: string,
        },
        email: string,
        phoneNumber: string,
        firstName: string,
        lastName: string,
    };
    totalPrice: number;
    status: OrderStatus;
    userId: string;
    version: number;
    expiresAt: Date;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
    {
        orderNo: {
            type: Number,
        },
        products: [{
            product: {
                id: {
                    type: String
                },
                title: { type: String },
                price: { type: Number },
                quantity: { type: Number },
                sale: { type: Number },
                image: { type: String }
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        contact: {
            billingAddress: {
                country: { type: String },
                city: { type: String },
                postCode: { type: String },
                street: { type: String }
            },
            deliveryAddress: {
                country: { type: String },
                city: { type: String },
                postCode: { type: String },
                street: { type: String }
            },
            email: {
                type: String,
                required: true,
            },
            phoneNumber: {
                type: String,
                required: true
            },
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        totalPrice: {
            type: Number,
        },
        status: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
        },
        expiresAt: {
            type: mongoose.Schema.Types.Date,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
        timestamps: true
    }
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);
orderSchema.plugin(AutoIncrement, { inc_field: 'orderNo' });

orderSchema.index({ 'contact.firstName': 'text', 'contact.lastName': 'text', 'contact.email': 'text' });

orderSchema.pre('save', async function (done) {
    // @ts-ignore
    this.set('totalPrice', this.calculateTotalPrice());
    done();
});

orderSchema.methods.calculateTotalPrice = function () {
    let totalPrice = 0

    this.products.forEach((item: { product: ProductDoc, quantity: number }) => {
        totalPrice += ((item.product.price - (item.product.price * (item.product.sale / 100))) * item.quantity);
    })

    return Math.round((totalPrice + Number.EPSILON) * 100) / 100;
}

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
