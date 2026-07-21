import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import studentRoutes from "./modules/students/student.routes";
import teacherRoutes from "./modules/teachers/teacher.routes";
import classroomRoutes from "./modules/classrooms/classroom.routes";
import schoolYearRoutes from "./modules/schoolYears/schoolYear.routes";
import semesterRoutes from "./modules/semesters/semester.routes";
import subjectRoutes from "./modules/subjects/subject.routes";
import scheduleRoutes from "./modules/schedules/schedule.routes";
import attendanceRoutes from "./modules/attendance/attendance.routes";
import roleRoutes from "./modules/roles/role.routes";
import teacherImportRoutes from "./modules/teacherImport/teacherImport.routes";

const app = express();

// แก้ปัญหา Prisma BigInt serialize JSON
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Classcheck API 🚀" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/classrooms", classroomRoutes);
app.use("/school-years", schoolYearRoutes);
app.use("/semesters", semesterRoutes);
app.use("/subjects", subjectRoutes);
app.use("/schedules", scheduleRoutes);
app.use("/attendances", attendanceRoutes);
app.use("/roles", roleRoutes);
app.use("/api/import",teacherImportRoutes);

export default app;