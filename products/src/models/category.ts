import mongoose from 'mongoose';

interface CategoryAttrs {
    categoryName: string;
}

export interface CategoryDoc extends mongoose.Document {
    categoryName: string;
    version: number;
}

interface CategoryModel extends mongoose.Model<CategoryDoc> {
    build(attrs: CategoryAttrs): CategoryDoc;
}

const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true,
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

categorySchema.set('versionKey', 'version');

categorySchema.statics.build = (attrs: CategoryAttrs) => {
    return new Category(attrs);
};

const Category = mongoose.model<CategoryDoc, CategoryModel>('Category', categorySchema);

export { Category };
