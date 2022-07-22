import nodemailer from 'nodemailer';

export class MailService {
    private SERVICE = 'gmail';
    private senderEmail;
    private transporter;

    constructor(senderEmail: string) {
        this.senderEmail = senderEmail;
        this.transporter = nodemailer.createTransport({
            service: this.SERVICE,
            auth: {
                user: this.senderEmail,
                pass: ''
            }
        })
    }

    async send(to: string, subject: string, html: string) {
        await this.transporter.sendMail({from: this.senderEmail, to, subject, html})
    }
}