import { Response, Request } from "express";
import { ForgotPasswordService } from "../../../services/User/Passwords/ForgotPasswordService";

export class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const service = new ForgotPasswordService();

    const { email } = request.body;

    await service.init(email);

    return response.status(200).send({ success: "Email sent" });
  }
}
