import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";

interface Teacher {
  id: number;

  teacherCode: string;

  fullName: string;

  position: string;
}

interface TeacherResponse {
  id: number;

  teacherCode: string;

  fullName?: string;

  firstName?: string;

  lastName?: string;

  position: string;
}

export default function TeacherPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [open, setOpen] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    fullname: "",

    position: "ครู",
  });

  // ==========================
  // โหลดข้อมูลครู
  // ==========================

  const fetchTeachers = async () => {
    try {
      const res = await fetch("http://localhost:3000/teachers");

      const result = await res.json();

      console.log("Teacher API:", result);

      const data = result.data ?? result;

      const teacherList = data as TeacherResponse[];

      setTeachers(
        teacherList.map((teacher) => ({
          id: teacher.id,

          teacherCode: teacher.teacherCode,

          fullName:
            teacher.fullName ??
            `${teacher.firstName ?? ""} ${teacher.lastName ?? ""}`,

          position: teacher.position,
        })),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadTeachers = async () => {
      await fetchTeachers();
    };
    loadTeachers();
  }, []);

  // ==========================
  // เพิ่มครู
  // ==========================

  const handleSave = async () => {
    try {
      await fetch(
        "http://localhost:3000/teachers",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        },
      );

      setForm({
        fullname: "",

        position: "ครู",
      });

      setOpen(false);

      fetchTeachers();
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Import Excel
  // ==========================

  const handleImport = async () => {
    if (!file) {
      alert("กรุณาเลือกไฟล์ Excel");

      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        "file",

        file,
      );

      const res = await fetch(
        "http://localhost:3000/api/teachers/import",

        {
          method: "POST",

          body: formData,
        },
      );

      const result = await res.json();

      console.log("Import:", result);

      if (res.ok) {
        alert("Import สำเร็จ");

        setFile(null);

        fetchTeachers();
      } else {
        alert(result.message || "Import ไม่สำเร็จ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">ครู</Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button variant="contained" onClick={() => setOpen(true)}>
            + เพิ่มครู
          </Button>

          <Button variant="outlined" component="label">
            {file ? file.name : "Import Excel"}

            <input
              hidden
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => {
                if (e.target.files) {
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

      {/* Card */}
      <Card>
        <CardContent>
          <TextField
            fullWidth
            label="ค้นหาครู"
            sx={{
              mb: 3,
            }}
          />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>รหัสครู</TableCell>

                  <TableCell>ชื่อ - นามสกุล</TableCell>

                  <TableCell>ตำแหน่ง</TableCell>

                  <TableCell align="center">จัดการ</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.teacherCode}</TableCell>

                    <TableCell>{teacher.fullName}</TableCell>

                    <TableCell>{teacher.position}</TableCell>

                    <TableCell align="center">
                      <Button
                        color="warning"
                        startIcon={<Edit />}
                        sx={{ mr: 1 }}
                      >
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

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>เพิ่มครู</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="ชื่อ-นามสกุล"
            margin="normal"
            value={form.fullname}
            onChange={(e) =>
              setForm({
                ...form,
                fullname: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            label="ตำแหน่ง"
            margin="normal"
            value={form.position}
            onChange={(e) =>
              setForm({
                ...form,
                position: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>ยกเลิก</Button>

          <Button variant="contained" onClick={handleSave}>
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
