import { Request, Response } from "express";
import { AttendanceService } from "./attendance.service";

export class AttendanceController {
  static async create(req: Request, res: Response) {
    try {
      const attendance = await AttendanceService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "บันทึกการเข้าเรียนสำเร็จ",
        data: attendance,
      });
    } catch (error: any) {
      console.error("Create Attendance Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const attendances = await AttendanceService.getAll();

      return res.json({
        success: true,
        data: attendances,
      });
    } catch (error: any) {
      console.error("Get All Attendance Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "เกิดข้อผิดพลาดในการดึงข้อมูล",
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          success: false,
          message: "รูปแบบ ID ไม่ถูกต้อง",
        });
      }

      const attendance = await AttendanceService.getById(BigInt(id));

      if (!attendance) {
        return res.status(404).json({
          success: false,
          message: "ไม่พบข้อมูลการเข้าเรียน",
        });
      }

      return res.json({
        success: true,
        data: attendance,
      });
    } catch (error: any) {
      console.error("Get Attendance By ID Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "เกิดข้อผิดพลาดในการดึงข้อมูล",
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          success: false,
          message: "รูปแบบ ID ไม่ถูกต้อง",
        });
      }

      const attendance = await AttendanceService.update(BigInt(id), req.body);

      return res.json({
        success: true,
        message: "แก้ไขข้อมูลสำเร็จ",
        data: attendance,
      });
    } catch (error: any) {
      console.error("Update Attendance Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "เกิดข้อผิดพลาดในการอัปเดตข้อมูล",
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          success: false,
          message: "รูปแบบ ID ไม่ถูกต้อง",
        });
      }

      await AttendanceService.delete(BigInt(id));

      return res.json({
        success: true,
        message: "ลบข้อมูลการเข้าเรียนเรียบร้อยแล้ว",
      });
    } catch (error: any) {
      console.error("Delete Attendance Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "เกิดข้อผิดพลาดในการลบข้อมูล",
      });
    }
  }
}