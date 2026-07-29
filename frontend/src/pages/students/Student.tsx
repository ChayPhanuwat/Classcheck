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
} from "@mui/material";

import {
    Add,
    Edit,
    Delete
} from "@mui/icons-material";


export default function Student() {


    const students = [
        {
            id: 1,
            code: "65001",
            name: "นายทดสอบ ใจดี",
            classroom: "ม.1/1"
        },
        {
            id: 2,
            code: "65002",
            name: "นางสาวสมใจ เรียนดี",
            classroom: "ม.1/2"
        },
    ];


    return (

        <Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Typography
                    variant="h4"
                >
                    นักเรียน
                </Typography>


                <Button
                    variant="contained"
                    startIcon={<Add />}
                >
                    เพิ่มนักเรียน
                </Button>


            </Box>



            <Card>

                <CardContent>


                    <TextField
                        fullWidth
                        label="ค้นหานักเรียน"
                        sx={{
                            mb: 3
                        }}
                    />


                    <TableContainer
                        component={Paper}
                    >

                        <Table>


                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        รหัสนักเรียน
                                    </TableCell>

                                    <TableCell>
                                        ชื่อ - สกุล
                                    </TableCell>

                                    <TableCell>
                                        ห้องเรียน
                                    </TableCell>

                                    <TableCell>
                                        จัดการ
                                    </TableCell>

                                </TableRow>

                            </TableHead>



                            <TableBody>

                                {
                                    students.map((student) => (

                                        <TableRow
                                            key={student.id}
                                        >

                                            <TableCell>
                                                {student.code}
                                            </TableCell>


                                            <TableCell>
                                                {student.name}
                                            </TableCell>


                                            <TableCell>
                                                {student.classroom}
                                            </TableCell>


                                            <TableCell>

                                                <Button
                                                    color="warning"
                                                    startIcon={<Edit />}
                                                >
                                                    แก้ไข
                                                </Button>


                                                <Button
                                                    color="error"
                                                    startIcon={<Delete />}
                                                >
                                                    ลบ
                                                </Button>


                                            </TableCell>


                                        </TableRow>

                                    ))
                                }


                            </TableBody>


                        </Table>

                    </TableContainer>


                </CardContent>

            </Card>


        </Box>

    );

}