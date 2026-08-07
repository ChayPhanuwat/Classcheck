import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";

// =====================
// Type Definition
// =====================
interface Classroom {
  id: number;
  name: string;
}

interface StudentType {
  id: number;
  studentCode?: string;
  code?: string;
  fullName: string;
  classroom?: Classroom;
}

// =====================
// Component
// =====================
export default function Student() {
  const [file, setFile] = useState<File | null>(null);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    studentCode: "",
    fullName: "",
    classroomId: 0,
  });

  // =====================
  // Load Students
  // =====================
  const fetchStudents = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:3000/students");
      const data = await res.json();
      const studentList: StudentType[] = data.data ?? data;
      setStudents(studentList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    const loadStudents = async () => {
      try {
        const res = await fetch("http://localhost:3000/students");
        const data = await res.json();
        if (mounted) {
          setStudents(data.data ?? data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadStudents();
    return () => {
      mounted = false;
    };
  }, []);

  // =====================
  // Add Student
  // =====================
  const handleAddStudent = async () => {
    try {
      const res = await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          classroomId: Number(form.classroomId),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("เพิ่มนักเรียนสำเร็จ");
        setOpen(false);
        setForm({
          studentCode: "",
          fullName: "",
          classroomId: 0,
        });
        fetchStudents();
      } else {
        alert(data.message || "เพิ่มไม่สำเร็จ");
      }
    } catch (error) {
      console.error(error);
      alert("เชื่อมต่อ Backend ไม่ได้");
    }
  };

  // =====================
  // Import Excel
  // =====================
  const handleImport = async () => {
    if (!file) {
      alert("กรุณาเลือกไฟล์ Excel");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      
      // เพิ่ม classroomId ลงไปให้เหมือนที่ส่งผ่าน Postman (ทดสอบใส่ค่า "1")
      formData.append("classroomId", "1"); 

      // แก้ Endpoint เป็น URL ให้ตรงกับใน Postman
      const res = await fetch("http://localhost:3000/api/students/import/students", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Import สำเร็จ");
        setFile(null); // เคลียร์ state ไฟล์
        fetchStudents(); // โหลดข้อมูลใหม่
      } else {
        alert(data.message || "Import ไม่สำเร็จ");
      }
    } catch (error) {
      console.error(error);
      alert("Backend ไม่ทำงาน");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">นักเรียน</Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          >
            เพิ่มนักเรียน
          </Button>

          <Button variant="outlined" component="label">
            {file ? file.name : "เลือกไฟล์ Excel"}
            <input
              hidden
              type="file"
              accept=".xlsx,.xls,.csv"
              onClick={(e) => {
                (e.target as HTMLInputElement).value = "";
              }}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </Button>

          <Button
            variant="contained"
            color="success"
            disabled={!file}
            onClick={handleImport}
          >
            นำเข้า
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <TextField
            fullWidth
            label="ค้นหานักเรียน"
            sx={{
              mb: 3,
            }}
          />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>รหัสนักเรียน</TableCell>
                  <TableCell>ชื่อ - สกุล</TableCell>
                  <TableCell>ห้องเรียน</TableCell>
                  <TableCell align="center">จัดการ</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {students.map((student: StudentType) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.studentCode ?? student.code}</TableCell>
                    <TableCell>{student.fullName}</TableCell>
                    <TableCell>{student.classroom?.name ?? "-"}</TableCell>
                    <TableCell align="center">
                      <Button color="warning" startIcon={<Edit />}>
                        แก้ไข
                      </Button>
                      <Button color="error" startIcon={<Delete />}>
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>เพิ่มนักเรียน</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="รหัสนักเรียน"
            margin="normal"
            value={form.studentCode}
            onChange={(e) =>
              setForm({
                ...form,
                studentCode: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="ชื่อ - สกุล"
            margin="normal"
            value={form.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                fullName: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="Classroom ID"
            margin="normal"
            type="number"
            value={form.classroomId}
            onChange={(e) =>
              setForm({
                ...form,
                classroomId: Number(e.target.value),
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>ยกเลิก</Button>
          <Button variant="contained" onClick={handleAddStudent}>
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}