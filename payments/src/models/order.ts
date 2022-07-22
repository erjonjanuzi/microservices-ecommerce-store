import mongoose from 'mongoose';
import { OrderStatus } from '@labcourseapp/common';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

interface OrderAttrs {
    id: string;
    version: number;
    userId?: string;
    status: OrderStatus;
    totalPrice: number;
}

interface OrderDoc extends mongoose.Document {
    version: number;
    userId?: string;
    status: OrderStatus;
    totalPrice: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        totalPrice: attrs.totalPrice,
        userId: attrs.userId,
        status: attrs.status
    });
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };