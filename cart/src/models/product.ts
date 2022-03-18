import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ProductAttrs {
    id: string;
    title: string;
    price: number;
    quantity: number;
    sale: number;
}

export interface ProductDoc extends mongoose.Document {
    title: string;
    price: number;
    quantity: number;
    sale: number;
    version: number;
}

interface ProductModel extends mongoose.Model<ProductDoc>{
    build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema({
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

productSchema.set('versionKey', 'version');
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
        quantity: attrs.quantity,
        sale: attrs.sale
    });
}

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };