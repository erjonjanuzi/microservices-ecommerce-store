import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ProductDoc } from './product';

interface WishlistAttrs {
    userId: string;
}

interface WishlistDoc extends mongoose.Document {
    products: string[];
    userId: string;
    version: number;
}

interface WishlistModel extends mongoose.Model<WishlistDoc> {
    build(attrs: WishlistAttrs): WishlistDoc;
}

const wishlistSchema = new mongoose.Schema({
    products: [{
        type: String,
    }],
    userId: {
        type: String,
        required: true
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    },
})

wishlistSchema.set('versionKey', 'version');
wishlistSchema.plugin(updateIfCurrentPlugin);

wishlistSchema.statics.build = (attrs: WishlistAttrs) => {
    return new Wishlist(attrs);
}

const Wishlist = mongoose.model<WishlistDoc, WishlistModel>('wishlist', wishlistSchema);

export { Wishlist };