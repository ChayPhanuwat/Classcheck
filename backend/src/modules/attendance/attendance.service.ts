import { prisma } from "../../../lib/prisma";

export class AttendanceService {
  static async create(data: any) {
    return await prisma.attendance.create({
      data,
    });
  }

  static async getAll() {
    return await prisma.attendance.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  static async getById(id: bigint) {
    return await prisma.attendance.findUnique({
      where: {
        id,
      },
    });
  }

  static async update(id: bigint, data: any) {
    return await prisma.attendance.update({
      where: {
        id,
      },
      data,
    });
  }

  static async delete(id: bigint) {
    return await prisma.attendance.delete({
      where: {
        id,
      },
    });
  }
}