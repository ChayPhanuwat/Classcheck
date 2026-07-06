import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      res.json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const user = await UserService.getById(BigInt(req.params.id));
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await UserService.delete(BigInt(req.params.id));
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error" });
    }
  }
}