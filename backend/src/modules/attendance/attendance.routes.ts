import { Router } from "express";
import { AttendanceController } from "./attendance.controller";

const router = Router();

router.post("/", AttendanceController.create);

router.get("/", AttendanceController.getAll);

router.get("/:id", AttendanceController.getById);

router.put("/:id", AttendanceController.update);

router.delete("/:id", AttendanceController.delete);

export default router;