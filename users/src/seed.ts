import { Admin } from './models/admin';

export class Seed {
    static async init() {
        const adminObj = {
            firstName: 'Erjon',
            lastName: 'Januzi',
            email: 'erjonjanuzi@gmail.com',
            password: 'password',
        };

        const { firstName, lastName, email, password } = adminObj;

        const existingUser = await Admin.findOne({ email });

        if (existingUser) {
            return;
        }

        const admin = Admin.build({ firstName, lastName, email, password });
        await admin.save();
    }
}
