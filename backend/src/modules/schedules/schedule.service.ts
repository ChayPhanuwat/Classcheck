import { prisma } from "../../../lib/prisma";

export class ScheduleService {
  static async create(data: any) {
    return await prisma.schedule.create({
      data,
    });
  }

  // 👉 ปรับแต่งเมธอด getAll ให้รับ teacherId เข้ามาเพื่อกรองข้อมูล
  static async getAll(teacherId?: bigint | string) {
    return await prisma.schedule.findMany({
      where: teacherId ? { teacherId: BigInt(teacherId) } : undefined, // ถ้ามี teacherId ให้กรองเฉพาะของครูคนนั้น
      include: {
        subject: true,
        classroom: true,
        teacher: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  static async getById(id: bigint) {
    return await prisma.schedule.findUnique({
      where: {
        id,
      },
      include: {
        subject: true,
        classroom: true,
        teacher: true,
      },
    });
  }

  static async update(id: bigint, data: any) {
    return await prisma.schedule.update({
      where: {
        id,
      },
      data,
    });
  }

  static async delete(id: bigint) {
    return await prisma.schedule.delete({
      where: {
        id,
      },
    });
  }
}