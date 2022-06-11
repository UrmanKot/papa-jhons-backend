import { Injectable } from '@nestjs/common';
import  {Transporter, createTransport} from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  private transporter: Transporter<SMTPTransport.Options>;

  constructor() {
    this.transporter = createTransport({
      port: Number(process.env.SMTP_PORT),
      host: process.env.SMTP_HOST,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта на сайте ${process.env.API_URL}`,
      text: 'Активация аккаунта',
      html: `
        <div>
          Для активации аккаунта перейдите по ссылке
          <a href="${link}">${link}</a>
        </div>
      `
    })
  }
}
