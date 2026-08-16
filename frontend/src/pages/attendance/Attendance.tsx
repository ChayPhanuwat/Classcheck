import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// =====================
// Type Definition
// =====================
interface Schedule {
  id: string | number;
  subjectName?: string;
  classroomName?: string;
  title?: string; 
}

interface StudentType {
  id: string | number;
  studentCode?: string;
  code?: string;
  fullName: string;
  classroomId?: string | number;
  status?: string; 
}

interface UserType {
  id?: string | number;
  username?: string;
  role?: string;
  teacherId?: string | number; // 👈 เพิ่ม teacherId สำหรับรองรับการกรองข้อมูลครู
  [key: string]: unknown;
}

export default function Attendance() {
  const navigate = useNavigate();
  const [scheduleId, setScheduleId] = useState<string>(""); 
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [students, setStudents] = useState<StudentType[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  // ดึงข้อมูล User ที่ล็อกอินอยู่
  const currentUser: UserType = JSON.parse(localStorage.getItem("user") || "{}");

  // =====================
  // Load Data from API
  // =====================
  useEffect(() => {
    let mounted = true;

    const loadSchedules = async () => {
      try {
        // ตรวจสอบสิทธิ์และดึง teacherId ถ้าเป็น Teacher
        const teacherId = currentUser.teacherId;
        const role = currentUser.role;

        let url = "http://localhost:3000/schedules";
        // ถ้าเป็น Teacher และมี teacherId ให้ส่งแนบไปกับ Query เพื่อกรองเฉพาะของครูคนนั้น
        if (role === "Teacher" && teacherId) {
          url += `?teacherId=${teacherId}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        if (mounted) {
          setSchedules(data.data ?? data);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch schedules", error);
      }
    };

    const loadStudents = async () => {
      try {
        const res = await fetch("http://localhost:3000/students");
        const data = await res.json();

        if (mounted) {
          const studentList: StudentType[] = data.data ?? data;
          const studentsWithStatus = studentList.map(student => ({
            ...student,
            status: "มาเรียน"
          }));

          setStudents(studentsWithStatus);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch students", error);
      }
    };

    loadSchedules();
    loadStudents();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================
  // Handle Status Change
  // =====================
  const handleStatusChange = (id: string | number, newStatus: string) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  // =====================
  // Save Attendance & Redirect
  // =====================
  const handleSaveAttendance = async () => {
    if (!scheduleId) {
      alert("กรุณาเลือกตารางเรียน / คาบเรียนก่อนบันทึก");
      return;
    }

    const attendanceData = {
      attendanceDate: new Date(date).toISOString(),
      scheduleId: Number(scheduleId),
      checkedBy: Number(currentUser.id || 1),
      records: students.map(s => ({
        studentId: Number(s.id),
        status: s.status
      }))
    };

    try {
      const response = await fetch("http://localhost:3000/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendanceData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to save attendance");
      }

      alert("บันทึกการเข้าเรียนสำเร็จ!");
      navigate("/reports");

    } catch (error: unknown) {
      console.error("Error saving attendance:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + errorMessage);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        เช็คชื่อเข้าเรียน
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <FormControl sx={{ minWidth: 250 }}>
              <InputLabel>ตารางเรียน / คาบเรียน</InputLabel>
              <Select
                value={scheduleId}
                label="ตารางเรียน / คาบเรียน"
                onChange={(e) => setScheduleId(e.target.value)}
              >
                <MenuItem value=""><em>-- กรุณาเลือกคาบเรียน --</em></MenuItem>
                {schedules.map((sch) => (
                  <MenuItem key={String(sch.id)} value={String(sch.id)}>
                    {sch.title || `${sch.subjectName ?? "วิชา"} (${sch.classroomName ?? "ห้อง"})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>รหัสนักเรียน</TableCell>
                  <TableCell>ชื่อ - สกุล</TableCell>
                  <TableCell>สถานะการเข้าเรียน</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {students.map((student) => (
                  <TableRow key={String(student.id)}>
                    <TableCell>{student.studentCode ?? student.code}</TableCell>
                    <TableCell>{student.fullName}</TableCell>
                    <TableCell>
                      <FormControl size="small">
                        <Select
                          value={student.status || "มาเรียน"}
                          onChange={(e) => handleStatusChange(student.id, e.target.value)}
                          sx={{
                            minWidth: 120,
                            backgroundColor:
                              student.status === "ขาด" ? "#ffebee" :
                                student.status === "ลา" ? "#fff3e0" :
                                  "#e8f5e9"
                          }}
                        >
                          <MenuItem value="มาเรียน">มาเรียน</MenuItem>
                          <MenuItem value="สาย">สาย</MenuItem>
                          <MenuItem value="ลา">ลา</MenuItem>
                          <MenuItem value="ขาด">ขาด</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
                {students.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      ไม่พบรายชื่อนักเรียน
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            startIcon={<Save />}
            sx={{ mt: 3 }}
            onClick={handleSaveAttendance}
          >
            บันทึกการเข้าเรียน
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}