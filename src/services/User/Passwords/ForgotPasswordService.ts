import path from "path";
import { MailProvider } from "../../../providers/MailProvider";
import { UsersRepository } from "../../../repositories/User/UsersRepository";
import { UsersTokenRepository } from "../../../repositories/UsersToken/UsersTokenRepository";

import { AppError } from "../../../errors/AppError";

export class ForgotPasswordService {
  async init(email: string): Promise<void> {
    const usersRepository = new UsersRepository();
    const usersTokenRepository = new UsersTokenRepository();
    const mailProvider = new MailProvider();

    const user = await usersRepository.findByEmail(email);
    if (!user) throw new AppError("This email does not exist", 404);

    const template = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "views",
      "resetPassword.hbs"
    );

    const userToken = await usersTokenRepository.create(user.id);
    console.log({ token: userToken.token });

    await mailProvider.sendMail({
      to: {
        name: user.username,
        address: user.email,
      },
      subject: "[Equipe MemoRise]: Email de recuperação de senha",
      template: {
        file: template,
        variables: {
          username: user.username,
          link: `http://localhost:3000/reset-password?token=${userToken.token}`
        }
      }
    })
  }
}
