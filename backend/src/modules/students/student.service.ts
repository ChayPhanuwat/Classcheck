import { prisma } from "../../../lib/prisma";

export class StudentService {
  static async create(data: any) {
    let classroomName = data.classroomName;

    // ถ้าส่ง classroomId มา แต่ไม่มี classroomName ให้ไปดึงชื่อห้องจาก DB อัตโนมัติ
    if (data.classroomId && !classroomName) {
      const classroom = await prisma.classroom.findUnique({
        where: { id: BigInt(data.classroomId) },
      });
      classroomName = classroom?.classroomName ?? null;
    }

    return await prisma.student.create({
      data: {
        ...data,
        classroomId: data.classroomId ? BigInt(data.classroomId) : null,
        classroomName: classroomName ?? null,
      },
      include: {
        classroom: true, // แนบ object classroom กลับไปด้วยเพื่อแสดงผลหน้าเว็บ
      },
    });
  }

  static async getAll(teacherId?: string) {
    const whereClause: any = {};
    
    if (teacherId) {
      whereClause.classroom = {
        teacherId: BigInt(teacherId)
      };
    }

    return await prisma.student.findMany({
      where: whereClause,
      include: {
        classroom: true, // แก้ไขปัญหาห้องเรียนแสดงผลเป็น "-"
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  static async getById(id: bigint) {
    return await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        classroom: true, // แนบข้อมูลห้องเรียน
      },
    });
  }

  static async update(id: bigint, data: any) {
    const updateData: any = { ...data };

    // ถ้ามีการเปลี่ยนห้องเรียน (classroomId) ให้ดึงชื่อห้องเรียนใหม่ด้วย
    if (data.classroomId !== undefined) {
      updateData.classroomId = data.classroomId ? BigInt(data.classroomId) : null;

      if (!data.classroomName && data.classroomId) {
        const classroom = await prisma.classroom.findUnique({
          where: { id: BigInt(data.classroomId) },
        });
        updateData.classroomName = classroom?.classroomName ?? null;
      }
    }

    return await prisma.student.update({
      where: {
        id,
      },
      data: updateData,
      include: {
        classroom: true, // แนบข้อมูลห้องเรียน
      },
    });
  }

  static async delete(id: bigint) {
    return await prisma.student.delete({
      where: {
        id,
      },
    });
  }
}