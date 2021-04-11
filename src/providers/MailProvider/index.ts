import nodemailer from "nodemailer";
import {
  IParseMailTemplate,
  MailTemplateProvider,
} from "../MailTemplateProvider";

interface IMailData {
  name: string;
  address: string;
}

interface ISendMail {
  to: IMailData;
  from?: IMailData;
  subject: string;
  template: IParseMailTemplate;
}

export class MailProvider {
  async sendMail({ to, from, subject, template }: ISendMail): Promise<void> {
    const mailTemplateProvider = new MailTemplateProvider();

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      tls: { rejectUnauthorized: false },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || "[Equipe] - MemoRise",
        address: from?.address || "contato@memorise.com.br",
      },
      to: {
        name: to.name,
        address: to.address,
      },
      subject,
      html: await mailTemplateProvider.parse(template),
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
