import { Roles } from '@labcourseapp/common';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Password } from '../services/Password';

interface UserAttrs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    country: string;
    city: string;
    postalCode: string;
    street: string;
}

interface UserDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    personalDetails: {
        phoneNumber: string;
    };
    address: {
        country: string;
        city: string;
        postalCode: string;
        street: string;
    };
    role: Roles;
    isVerified: boolean;
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
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        personalDetails: {
            phoneNumber: {
                type: String,
                required: true,
            },
        },
        address: {
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
        },
        role: {
            type: String,
            default: Roles.USER,
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.version;
            },
        },
        timestamps: true,
    }
);

userSchema.set('versionKey', 'version');
userSchema.plugin(updateIfCurrentPlugin);

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User({
        firstName: attrs.firstName,
        lastName: attrs.lastName,
        email: attrs.email,
        password: attrs.password,
        personalDetails: {
            phoneNumber: attrs.phoneNumber,
        },
        address: {
            country: attrs.country,
            city: attrs.city,
            postalCode: attrs.postalCode,
            street: attrs.street,
        },
    });
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema, 'users');

export { User };
