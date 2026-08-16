import { Request, Response } from "express";
import { ScheduleService } from "./schedule.service";

export class ScheduleController {
  static async create(req: Request, res: Response) {
    try {
      const schedule = await ScheduleService.create(req.body);

      return res.status(201).json({
        success: true,
        data: schedule,
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
      // ดึง teacherId จาก Query Parameter (เช่น /schedules?teacherId=1)
      const { teacherId } = req.query;

      // ส่ง teacherId ไปให้ Service กรองข้อมูล
      const schedules = await ScheduleService.getAll(teacherId as string);

      return res.json({
        success: true,
        data: schedules,
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

      const schedule = await ScheduleService.getById(id);

      if (!schedule) {
        return res.status(404).json({
          success: false,
          message: "Schedule not found",
        });
      }

      return res.json({
        success: true,
        data: schedule,
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

      const schedule = await ScheduleService.update(id, req.body);

      return res.json({
        success: true,
        data: schedule,
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

      await ScheduleService.delete(id);

      return res.json({
        success: true,
        message: "Schedule deleted successfully",
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