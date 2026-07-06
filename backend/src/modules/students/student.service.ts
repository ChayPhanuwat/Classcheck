import { prisma } from "../../../lib/prisma";

export class StudentService {
  static async create(data: any) {
    return prisma.student.create({
      data,
    });
  }

  static async getAll() {
    return prisma.student.findMany({
      include: {
        classroom: true,
      },
    });
  }

  static async getById(id: bigint) {
    return prisma.student.findUnique({
      where: { id },
      include: { classroom: true },
    });
  }

  static async update(id: bigint, data: any) {
    return prisma.student.update({
      where: { id },
      data,
    });
  }

  static async delete(id: bigint) {
    return prisma.student.delete({
      where: { id },
    });
  }
}