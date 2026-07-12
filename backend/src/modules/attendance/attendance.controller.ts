import { Request, Response } from "express";
import { AttendanceService } from "./attendance.service";

export class AttendanceController {
  static async create(req: Request, res: Response) {
    try {
      const attendance = await AttendanceService.create(req.body);

      return res.status(201).json({
        success: true,
        data: attendance,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
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
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = BigInt(req.params.id as string);

      const attendance = await AttendanceService.getById(id);

      if (!attendance) {
        return res.status(404).json({
          success: false,
          message: "Attendance not found",
        });
      }

      return res.json({
        success: true,
        data: attendance,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = BigInt(req.params.id as string);

      const attendance = await AttendanceService.update(id, req.body);

      return res.json({
        success: true,
        data: attendance,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = BigInt(req.params.id as string);

      await AttendanceService.delete(id);

      return res.json({
        success: true,
        message: "Attendance deleted successfully",
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}