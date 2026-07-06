import { Request, Response } from "express";
import { StudentService } from "./student.service";

export class StudentController {

  static async create(req: Request, res: Response) {
    try {
      const student = await StudentService.create(req.body);
      res.json({ success: true, data: student });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const students = await StudentService.getAll();
      res.json({ success: true, data: students });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const student = await StudentService.getById(BigInt(req.params.id));
      res.json({ success: true, data: student });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const student = await StudentService.update(
        BigInt(req.params.id),
        req.body
      );
      res.json({ success: true, data: student });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await StudentService.delete(BigInt(req.params.id));
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error" });
    }
  }
}