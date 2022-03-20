import { Roles } from '@labcourseapp/common';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Password } from '../services/Password';

interface AdminAttrs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface AdminDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Roles;
    version: number;
}

interface AdminModel extends mongoose.Model<AdminDoc> {
    build(adminAttrs: AdminAttrs): AdminDoc;
}

const adminSchema = new mongoose.Schema(
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
        role: {
            type: String,
            default: Roles.ADMIN,
        },
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

adminSchema.set('versionKey', 'version');

adminSchema.plugin(updateIfCurrentPlugin);

adminSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

adminSchema.statics.build = (attrs: AdminAttrs) => {
    return new Admin(attrs);
};

const Admin = mongoose.model<AdminDoc, AdminModel>('Admin', adminSchema, 'users');

export { Admin };
