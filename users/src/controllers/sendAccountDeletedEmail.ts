import { MailService } from '../services/MailService';
import { accountDeletedlHtmlTemplate } from '../utils/accountDeletedHTML.template';

export async function sendAccountDeletedEmail(origin: string, to: string) {

    const subject = 'We are sad to see you go'
    const html = accountDeletedlHtmlTemplate();

    await new MailService(process.env.SENDER_EMAIL!).send(
        to,
        subject,
        html
    );
}
