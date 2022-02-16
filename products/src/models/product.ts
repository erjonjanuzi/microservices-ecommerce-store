import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ProductAttrs {
    title: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    images: [{
        url: string;
        isMain?: boolean | undefined;
    }];
    rating?: number;
    sale?: number;
    reviews?: [{
        firstName: string;
        lastName: string;
        comment: string;
    }];
}

interface ProductDoc extends mongoose.Document {
    title: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    images: [{
        url: string;
        isMain?: boolean | undefined;
    }];
    rating?: number;
    sale?: number;
    reviews?: [{
        firstName: string;
        lastName: string;
        comment: string;
    }];
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
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    sale: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Array,
    },
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    },
    timestamps: true
});

productSchema.set('versionKey', 'version');
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
}

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };