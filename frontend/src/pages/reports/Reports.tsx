import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { People, School, Class, FactCheck } from "@mui/icons-material";
import { useEffect, useState } from "react";

// กำหนด Interface สำหรับข้อมูล Report
interface ReportData {
  students: number;
  teachers: number;
  classrooms: number;
  attendanceRate: string;
}

export default function ReportPage() {
  const [year, setYear] = useState<number>(2569);
  const [semester, setSemester] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const [reportData, setReportData] = useState<ReportData>({
    students: 0,
    teachers: 0,
    classrooms: 0,
    attendanceRate: "0%",
  });

  // ใช้ async/await เพื่อให้อ่านง่ายขึ้นและจัดการ Error ได้ดีกว่า
  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/reports?year=${year}&semester=${semester}`
        );
        const data = await res.json();

        if (data?.data) {
          setReportData({
            students: data.data.students || 0,
            teachers: data.data.teachers || 0,
            classrooms: data.data.classrooms || 0,
            attendanceRate: data.data.attendanceRate || "0%",
          });
        }
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [year, semester]);

  const reports = [
    {
      title: "นักเรียนทั้งหมด",
      value: reportData.students,
      icon: <People sx={{ color: "#1976d2", fontSize: { xs: 32, sm: 40 } }} />,
      bgColor: "#e3f2fd",
    },
    {
      title: "ครูทั้งหมด",
      value: reportData.teachers,
      icon: <School sx={{ color: "#2e7d32", fontSize: { xs: 32, sm: 40 } }} />,
      bgColor: "#e8f5e9",
    },
    {
      title: "ห้องเรียน",
      value: reportData.classrooms,
      icon: <Class sx={{ color: "#ed6c02", fontSize: { xs: 32, sm: 40 } }} />,
      bgColor: "#fff3e0",
    },
    {
      title: "การเข้าเรียน",
      value: reportData.attendanceRate,
      icon: <FactCheck sx={{ color: "#9c27b0", fontSize: { xs: 32, sm: 40 } }} />,
      bgColor: "#f3e5f5", // สีม่วงอ่อนให้เข้ากับไอคอน
    },
  ];

  return (
    <Box sx={{ width: "100%", pb: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 2, sm: 3 },
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
        }}
      >
        รายงาน
      </Typography>

      {/* Filter Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // มือถือเรียงลงล่าง คอมเรียงแนวนอน
          gap: 2,
          mb: 4,
        }}
      >
        <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }} size="small">
          <InputLabel>ปีการศึกษา</InputLabel>
          <Select
            value={year}
            label="ปีการศึกษา"
            onChange={(e) => setYear(Number(e.target.value))}
          >
            <MenuItem value={2568}>2568</MenuItem>
            <MenuItem value={2569}>2569</MenuItem>
            <MenuItem value={2570}>2570</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }} size="small">
          <InputLabel>ภาคเรียน</InputLabel>
          <Select
            value={semester}
            label="ภาคเรียน"
            onChange={(e) => setSemester(Number(e.target.value))}
          >
            <MenuItem value={1}>ภาคเรียนที่ 1</MenuItem>
            <MenuItem value={2}>ภาคเรียนที่ 2</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Report Cards Section */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {reports.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 2,
                  transition: "0.3s",
                  height: "100%",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ minWidth: 0, pr: 1 }}>
                      <Typography
                        color="text.secondary"
                        variant="subtitle1"
                        sx={{
                          fontWeight: "medium",
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          wordBreak: "break-word",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        component="h2"
                        variant="h4"
                        sx={{
                          mt: 0.5,
                          fontWeight: "bold",
                          fontSize: { xs: "1.5rem", sm: "2rem" },
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: { xs: 1.2, sm: 1.5 },
                        borderRadius: 2,
                        backgroundColor: item.bgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}