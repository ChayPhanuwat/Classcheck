import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { generateToken } from "../../utils/jwt";

export class AuthService {
  // ... (ฟังก์ชัน register คงเดิม)

  static async login(username: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { 
        role: true,
        teacher: true // 👈 1. ดึงข้อมูล Teacher ที่ผูกกับ User นี้มาด้วย
      }
    });

    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new Error("Wrong password");

    const token = generateToken({
      userId: user.id.toString(),
      role: user.role.roleName,
      teacherId: user.teacherId ? user.teacherId.toString() : null // 👈 2. แนบ teacherId เข้าไปใน Token
    });

    // ส่ง object user กลับไป (ซึ่งจะมี teacherId ติดไปด้วย)
    return { 
      user: {
        id: user.id.toString(),
        username: user.username,
        role: user.role.roleName,
        teacherId: user.teacherId ? user.teacherId.toString() : null
      }, 
      token 
    };
  }
}