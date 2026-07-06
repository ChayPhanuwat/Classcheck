import { prisma } from "../../../lib/prisma";

export class UserService {
  static async getAll() {
    return prisma.user.findMany({
      include: {
        role: true,
      },
    });
  }

  static async getById(id: bigint) {
    return prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  static async delete(id: bigint) {
    return prisma.user.delete({
      where: { id },
    });
  }
}