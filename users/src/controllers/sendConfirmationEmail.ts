import randomstring from 'randomstring';
import { redisWrapper } from '../redisWrapper';
import { MailService } from '../services/MailService';
import { confirmEmailHtmlTemplate } from '../utils/confirmEmailHTML.template';

const VERIFICATION_LINK_EXPIRE_TIME = 30 * 60 // 30 minutes

export async function sendConfirmationEmail(origin: string, to: string) {
    let token = randomstring.generate();

    await redisWrapper.client.set(to, token, {
        EX: VERIFICATION_LINK_EXPIRE_TIME,
    });

    token = Buffer.from(token).toString('base64');

    const verifyUrl = `${origin}/api/users/verifyemail?token=${token}&email=${to}`;

    const subject = 'Welcome to Quantum Store! Please verify your email'
    const html = confirmEmailHtmlTemplate(verifyUrl);

    await new MailService(process.env.SENDER_EMAIL!).send(
        to,
        subject,
        html
    );
}
