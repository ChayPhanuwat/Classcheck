import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {

  static async register(req: Request, res: Response) {
    try {
      const { username, password, roleId } = req.body;

      const user = await AuthService.register(
        username,
        password,
        BigInt(roleId)
      );

      res.json({
        success: true,
        data: user
      });

    } catch (err) {
      res.status(400).json({
        success: false,
        message: err instanceof Error ? err.message : "Error"
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const result = await AuthService.login(username, password);

      res.json({
        success: true,
        ...result
      });

    } catch (err) {
      res.status(401).json({
        success: false,
        message: err instanceof Error ? err.message : "Error"
      });
    }
  }
}