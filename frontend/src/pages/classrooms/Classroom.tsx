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


export default function Classroom() {


    const classrooms = [
        {
            id: 1,
            name: "ม.1/1",
            level: "ม.1",
            roomNumber: "1",
            year: 2569
        },
        {
            id: 2,
            name: "ม.1/2",
            level: "ม.1",
            roomNumber: "2",
            year: 2569
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
                    ห้องเรียน
                </Typography>


                <Button
                    variant="contained"
                    startIcon={<Add />}
                >
                    เพิ่มห้องเรียน
                </Button>


            </Box>



            <Card>

                <CardContent>


                    <TextField
                        fullWidth
                        label="ค้นหาห้องเรียน"
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
                                        ห้องเรียน
                                    </TableCell>


                                    <TableCell>
                                        ระดับชั้น
                                    </TableCell>


                                    <TableCell>
                                        ห้อง
                                    </TableCell>


                                    <TableCell>
                                        ปีการศึกษา
                                    </TableCell>


                                    <TableCell>
                                        จัดการ
                                    </TableCell>


                                </TableRow>

                            </TableHead>



                            <TableBody>


                                {
                                    classrooms.map((room)=>(

                                        <TableRow
                                            key={room.id}
                                        >

                                            <TableCell>
                                                {room.name}
                                            </TableCell>


                                            <TableCell>
                                                {room.level}
                                            </TableCell>


                                            <TableCell>
                                                {room.roomNumber}
                                            </TableCell>


                                            <TableCell>
                                                {room.year}
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