import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { Add, PersonAdd } from "@mui/icons-material";
import { useState, useEffect } from "react";

// =====================
// Type Definition
// =====================
interface Role {
  id: number;
  roleName: string;
  description?: string;
}

interface UserType {
  id: number;
  username: string;
  roleId?: number;
  role?: Role;
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  // ฟอร์มสำหรับเพิ่มผู้ใช้ใหม่
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("4"); // ค่าเริ่มต้นเลือก Teacher (id: 4 จากฐานข้อมูลของคุณ)

  const token = localStorage.getItem("token");

  // =====================
  // Load Data
  // =====================
  useEffect(() => {
    let mounted = true;
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/users", { headers });
        const data = await res.json();
        if (mounted) {
          setUsers(data.data ?? data);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch users", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const res = await fetch("http://localhost:3000/roles", { headers });
        const data = await res.json();
        if (mounted) {
          setRoles(data.data ?? data);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch roles", error);
      }
    };

    fetchUsers();
    fetchRoles();

    return () => {
      mounted = false;
    };
  }, [token]);

  // =====================
  // Handle Add User
  // =====================
  const handleOpenDialog = () => {
    setUsername("");
    setPassword("");
    setRoleId("4"); // Default เป็น Teacher
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSaveUser = async () => {
    if (!username || !password) {
      alert("กรุณากรอกชื่อผู้ใช้งานและรหัสผ่านให้ครบถ้วน");
      return;
    }

    const newUser = {
      username,
      password,
      roleId: Number(roleId)
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to create user");
      }

      alert("สร้างบัญชีผู้ใช้สำเร็จ!");
      setOpen(false);

      // โหลดข้อมูลผู้ใช้ใหม่
      const res = await fetch("http://localhost:3000/users", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      const data = await res.json();
      setUsers(data.data ?? data);

    } catch (error: unknown) {
      console.error("Error creating user:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert("เกิดข้อผิดพลาด: " + errorMessage);
    }
  };

  return (
    <Box sx={{ width: "100%", pb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          จัดการผู้ใช้งานระบบ
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          เพิ่มผู้ใช้งานใหม่
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>ชื่อผู้ใช้งาน (Username)</TableCell>
                  <TableCell>สิทธิ์การใช้งาน (Role)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.id}</TableCell>
                    <TableCell>{u.username}</TableCell>
                    <TableCell>
                      {u.role?.roleName || (u.roleId === 4 ? "Teacher" : `Role ID: ${u.roleId}`)}
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      ไม่พบข้อมูลผู้ใช้งาน
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog สำหรับเพิ่มผู้ใช้งาน */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>เพิ่มบัญชีผู้ใช้งานใหม่</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="ชื่อผู้ใช้งาน (Username)"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="รหัสผ่าน (Password)"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>สิทธิ์การใช้งาน (Role)</InputLabel>
              <Select
                value={roleId}
                label="สิทธิ์การใช้งาน (Role)"
                onChange={(e) => setRoleId(e.target.value)}
              >
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <MenuItem key={role.id} value={String(role.id)}>
                      {role.roleName} ({role.description || role.roleName})
                    </MenuItem>
                  ))
                ) : (
                  // Fallback หากยังไม่ได้ดึง Roles มาแสดง
                  <>
                    <MenuItem value="1">Admin</MenuItem>
                    <MenuItem value="2">Director</MenuItem>
                    <MenuItem value="3">ViceDirector</MenuItem>
                    <MenuItem value="4">Teacher</MenuItem>
                  </>
                )}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            ยกเลิก
          </Button>
          <Button onClick={handleSaveUser} variant="contained" startIcon={<PersonAdd />}>
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}