import { prisma } from "../../../lib/prisma";

export class SubjectService {
  static async create(data: any) {
    return await prisma.subject.create({
      data,
    });
  }

  static async getAll() {
    return await prisma.subject.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  static async getById(id: bigint) {
    return await prisma.subject.findUnique({
      where: {
        id,
      },
    });
  }

  static async update(id: bigint, data: any) {
    return await prisma.subject.update({
      where: {
        id,
      },
      data,
    });
  }

  static async delete(id: bigint) {
    return await prisma.subject.delete({
      where: {
        id,
      },
    });
  }
}