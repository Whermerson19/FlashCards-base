import { classToClass } from "class-transformer";
import { Response, Request } from "express";
import { ResetPasswordService } from "../../../services/User/Passwords/ResetPasswordService";

export class ResetPasswordController {
  async update(request: Request, response: Response): Promise<Response> {
    const service = new ResetPasswordService();

    const { password } = request.body;
    const { token } = request.query;

    const user = await service.init({
      token: String(token),
      password,
    });

    return response.status(200).json(classToClass(user));
  }
}
