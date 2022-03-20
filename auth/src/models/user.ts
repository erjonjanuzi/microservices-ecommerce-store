import mongoose from 'mongoose';
import { Password } from '../services/Password';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Roles } from '@labcourseapp/common';

interface UserAttrs {
    email: string;
    password: string;
    role: Roles;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    role: Roles;
    version: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: Object.values(Roles)
        },
    },
    {
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
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
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
