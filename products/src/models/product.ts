import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export interface Image {
    url: string;
}

interface ProductAttrs {
    title: string;
    manufacturer: string;
    price: number;
    sale?: number;
    quantity: number;
    description: string;
    category: string;
    images: Image[];
}

export interface ProductDoc extends mongoose.Document {
    title: string;
    manufacturer: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    images: Image[];
    sale: number;
    rating: number;
    reviews: [
        {
            _id: string;
            userId: string;
            firstName?: string;
            lastName?: string;
            comment?: string;
            rating: number;
        }
    ];
    isPromoted: boolean;
    version: number;
    getRating(): number;
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
        manufacturer: {
            type: String,
            required: true
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
        reviews: [{
            userId: { type: String },
            firstName: { type: String, required: false },
            lastName: { type: String, required: false },
            comment: { type: String, required: false },
            rating: { type: Number },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }],
        isPromoted: {
            type: Boolean,
            default: false
        }
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

productSchema.pre('save', async function (done) {
    // @ts-ignore
    this.set('rating', this.getRating());
    // @ts-ignore
    this.set('reviews', this.reviews.sort(function (a: any, b: any) {
        return b.createdAt - a.createdAt;
    }))
    done();
});

productSchema.methods.getRating = function () {
    let ratingSum = 0;
    const ratingCount = this.reviews.length;

    this.reviews.forEach((review: any) => {
        ratingSum += review.rating;
    })

    const rating = ratingSum / ratingCount;

    return rating;
}

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };
