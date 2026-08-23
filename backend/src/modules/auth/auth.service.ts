import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import { generateToken } from "../../utils/jwt";

export class AuthService {
  
  static async register(username: string, password: string, roleId: bigint) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, passwordHash, roleId },
      include: { role: true, teacher: true },
    });
    return user;
  }

  static async login(username: string, password: string) {
    // 1. ค้นหา User พร้อมดึงข้อมูล role และ teacher ที่ผูกไว้ (Step 1 ที่คุณทำไว้)
    const user = await prisma.user.findUnique({
      where: { username },
      include: { 
        role: true,
        teacher: true 
      }
    });

    if (!user) throw new Error("User not found");

    // 2. ตรวจสอบรหัสผ่าน (รองรับทั้งแบบเข้ารหัสและแบบข้อความธรรมดาเผื่อแอดเอง)
    const isValidBcrypt = await bcrypt.compare(password, user.passwordHash);
    const isValidPlain = (password === user.passwordHash);
    if (!isValidBcrypt && !isValidPlain) throw new Error("Wrong password");

    // 3. 🎯 ไฮไลท์ของ Step 2: สร้าง Token โดยแนบ teacherId ลงไปด้วย
    // เนื่องจาก teacherId ใน Prisma เป็น BigInt เราต้องแปลงเป็น String ก่อน
    const token = generateToken({
      userId: user.id.toString(),
      role: user.role.roleName,
      teacherId: user.teacherId ? user.teacherId.toString() : null
    });

    // 4. ส่งข้อมูลกลับไปให้หน้าเว็บ (Frontend)
    return { 
      user: {
        id: user.id.toString(),
        username: user.username,
        role: user.role.roleName,
        teacherId: user.teacherId ? user.teacherId.toString() : null // 👈 ส่งตัวนี้ไปให้หน้าเว็บใช้
      }, 
      token 
    };
  }
}