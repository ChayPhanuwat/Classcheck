import { Request, Response } from "express";
import { AuthService } from "./auth.service"; // ⚠️ เช็ก path ของไฟล์ auth.service ให้ตรงกับเครื่องคุณ

export class AuthController {
  
  // ฟังก์ชันลงทะเบียน
  static async register(req: Request, res: Response) {
    try {
      const { username, password, roleId } = req.body;
      
      const newUser = await AuthService.register(
        username, 
        password, 
        BigInt(roleId)
      );

      return res.status(201).json({
        success: true,
        message: "Register successfully",
        data: {
          id: newUser.id.toString(),
          username: newUser.username
        }
      });
    } catch (error: any) {
      console.error("Register Error:", error);
      return res.status(500).json({ 
        success: false, 
        message: error.message || "Internal server error" 
      });
    }
  }

  // ฟังก์ชันเข้าสู่ระบบ
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const result = await AuthService.login(username, password);

      return res.status(200).json({
        success: true,
        message: "Login successfully",
        data: result // ส่ง user และ token กลับไป
      });
    } catch (error: any) {
      console.error("Login Error:", error);
      return res.status(401).json({ 
        success: false, 
        message: error.message || "Invalid username or password" 
      });
    }
  }
}