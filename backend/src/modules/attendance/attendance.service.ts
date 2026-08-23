import { prisma } from "../../../lib/prisma";

export class AttendanceService {
  static async create(data: any) {
    const { attendanceDate, scheduleId, subjectId, checkedBy, records, details } = data;

    // 1. ตรวจสอบและหา Schedule ID ที่แท้จริง
    let targetScheduleId = scheduleId;

    if (!targetScheduleId && subjectId) {
      // ให้ฐานข้อมูลค้นหาว่าวิชานี้ (subjectId) มีตารางเรียน (Schedule) อยู่หรือไม่
      const schedule = await prisma.schedule.findFirst({
        where: { subjectId: BigInt(subjectId) },
      });

      // ถ้ายังไม่เคยสร้างตารางเรียนสำหรับวิชานี้เลย ให้โยน Error กลับไปบอก Frontend
      if (!schedule) {
        throw new Error("ไม่พบตารางเรียน (Schedule) สำหรับวิชานี้ กรุณาเข้าไปเพิ่มข้อมูลในเมนูตารางเรียนก่อน");
      }
      
      targetScheduleId = schedule.id;
    }

    if (!targetScheduleId) {
      throw new Error("ไม่สามารถระบุตารางเรียนได้ (Missing Schedule ID)");
    }

    const items = records || details || [];

    // 2. บันทึกข้อมูล
    return await prisma.attendance.create({
      data: {
        attendanceDate: new Date(attendanceDate),
        scheduleId: BigInt(targetScheduleId),
        checkedBy: BigInt(checkedBy),
        details: {
          create: items.map((r: any) => ({
            studentId: BigInt(r.studentId),
            status: r.status,
          })),
        },
      },
      include: {
        details: true,
        schedule: true,
      },
    });
  }

  static async getAll() {
    return await prisma.attendance.findMany({
      orderBy: { id: "asc" },
      include: {
        details: true,
        schedule: {
          include: { subject: true } // ดึงชื่อวิชามาด้วย เผื่อ frontend นำไปใช้
        }
      },
    });
  }

  static async getById(id: bigint) {
    return await prisma.attendance.findUnique({
      where: { id },
      include: {
        details: true,
        schedule: true,
      },
    });
  }

  static async update(id: bigint, data: any) {
    const { attendanceDate, scheduleId, checkedBy } = data;

    return await prisma.attendance.update({
      where: { id },
      data: {
        ...(attendanceDate && { attendanceDate: new Date(attendanceDate) }),
        ...(scheduleId && { scheduleId: BigInt(scheduleId) }),
        ...(checkedBy && { checkedBy: BigInt(checkedBy) }),
      },
      include: {
        details: true,
      },
    });
  }

  static async delete(id: bigint) {
    return await prisma.attendance.delete({
      where: { id },
    });
  }
}