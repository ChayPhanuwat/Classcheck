import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { generateToken } from "../../utils/jwt";

export class AuthService {

  static async register(username: string, password: string, roleId: bigint) {
    const existing = await prisma.user.findUnique({
      where: { username }
    });

    if (existing) {
      throw new Error("Username already exists");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        passwordHash: hash,
        roleId
      }
    });

    return user;
  }

  static async login(username: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { role: true }
    });

    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new Error("Wrong password");

    const token = generateToken({
      userId: user.id.toString(),
      role: user.role.roleName
    });

    return { user, token };
  }
}