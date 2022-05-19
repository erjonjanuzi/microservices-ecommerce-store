import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export interface Image {
    url: string;
}

interface ProductAttrs {
    title: string;
    price: number;
    sale?: number;
    quantity: number;
    description: string;
    category: string;
    images: Image[];
    rating?: number;
    reviews?: [
        {
            firstName: string;
            lastName: string;
            comment: string;
        }
    ];
}

interface ProductDoc extends mongoose.Document {
    title: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    images: Image[];
    rating?: number;
    sale: number;
    reviews?: [
        {
            firstName: string;
            lastName: string;
            comment: string;
        }
    ];
    version: number;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        sale: {
            type: Number,
            default: 0,
            required: true,
        },
        reviews: {
            type: Array,
        },
    },
    {
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
        timestamps: true,
    }
);

productSchema.set('versionKey', 'version');
productSchema.index({ title: 'text', description: 'text', category: 'text' });

productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
