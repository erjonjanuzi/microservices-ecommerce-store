import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface UserAttrs {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
    email: string;
    password: string;
    country: string;
    city: string;
    postalCode: string;
    role: string;
    street: string;
}

interface UserDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
    email: string;
    password: string;
    country: string;
    city: string;
    postalCode: string;
    street: string;
    role: string;
    version: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

userSchema.set('versionKey', 'version');
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User({
        _id: attrs.id,
        firstName: attrs.firstName,
        lastName: attrs.lastName,
        email: attrs.email,
        gender: attrs.gender,
        password: attrs.password,
        phoneNumber: attrs.phoneNumber,
        country: attrs.country,
        city: attrs.city,
        postalCode: attrs.postalCode,
        street: attrs.street,
        role: attrs.role
    });
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
