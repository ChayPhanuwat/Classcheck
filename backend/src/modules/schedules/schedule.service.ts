import { prisma } from "../../../lib/prisma";

export class ScheduleService {
  static async create(data: any) {
    return await prisma.schedule.create({
      data,
    });
  }

  static async getAll() {
    return await prisma.schedule.findMany({
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