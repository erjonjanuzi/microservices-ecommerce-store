import { Admin } from './models/admin';

export class Seed {
    static async init() {
        const adminUsers = [
            {
                firstName: 'Erjon',
                lastName: 'Januzi',
                email: 'erjonjanuzi@gmail.com',
                password: 'Pa$$w0rd',
            },

            {
                firstName: 'Engjell',
                lastName: 'Avdiu',
                email: 'engjellavdiu@gmail.com',
                password: 'Pa$$w0rd',
            },
        ];

        adminUsers.forEach(async (user) => {
            const { firstName, lastName, email, password } = user;

            const existingUser = await Admin.findOne({ email });

            if (existingUser) {
                return;
            }

            const admin = Admin.build({
                firstName,
                lastName,
                email,
                password,
            });
            await admin.save();
        });
    }
}
