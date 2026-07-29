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

import {
    Save
} from "@mui/icons-material";


import { useState } from "react";


export default function Attendance() {


    const [room, setRoom] = useState("");

    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );


    const students = [
        {
            id:1,
            code:"65001",
            name:"นายทดสอบ ใจดี",
            status:"มาเรียน"
        },
        {
            id:2,
            code:"65002",
            name:"นางสาวสมใจ เรียนดี",
            status:"ขาด"
        }
    ];



    return (

        <Box>


            <Typography
                variant="h4"
                sx={{
                    mb:3
                }}
            >
                เช็กชื่อเข้าเรียน
            </Typography>



            <Card>

                <CardContent>


                    <Box
                        sx={{
                            display:"flex",
                            gap:2,
                            mb:3
                        }}
                    >


                        <TextField
                            type="date"
                            value={date}
                            onChange={(e)=>
                                setDate(e.target.value)
                            }
                        />



                        <FormControl
                            sx={{
                                minWidth:200
                            }}
                        >

                            <InputLabel>
                                ห้องเรียน
                            </InputLabel>


                            <Select

                                value={room}

                                label="ห้องเรียน"

                                onChange={(e)=>
                                    setRoom(e.target.value)
                                }

                            >

                                <MenuItem value="ม.1/1">
                                    ม.1/1
                                </MenuItem>


                                <MenuItem value="ม.1/2">
                                    ม.1/2
                                </MenuItem>


                            </Select>


                        </FormControl>



                    </Box>



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
                                        สถานะ
                                    </TableCell>


                                </TableRow>


                            </TableHead>



                            <TableBody>


                                {
                                    students.map((student)=>(

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

                                                {student.status}

                                            </TableCell>


                                        </TableRow>

                                    ))
                                }


                            </TableBody>


                        </Table>


                    </TableContainer>



                    <Button
                        variant="contained"
                        startIcon={<Save />}
                        sx={{
                            mt:3
                        }}
                    >
                        บันทึกการเข้าเรียน
                    </Button>


                </CardContent>


            </Card>


        </Box>

    );

}