import { prisma } from "../../../lib/prisma";

export class ClassroomService {
  static async create(data: any) {
    return await prisma.classroom.create({
      data,
    });
  }

  static async getAll() {
    return await prisma.classroom.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  static async getById(id: bigint) {
    return await prisma.classroom.findUnique({
      where: {
        id,
      },
    });
  }

  static async update(id: bigint, data: any) {
    return await prisma.classroom.update({
      where: {
        id,
      },
      data,
    });
  }

  static async delete(id: bigint) {
    return await prisma.classroom.delete({
      where: {
        id,
      },
    });
  }
}