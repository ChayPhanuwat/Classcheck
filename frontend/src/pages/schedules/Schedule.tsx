import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

import { useEffect, useState } from "react";


interface Schedule {

    id:number;

    day:string;

    startTime:string;

    endTime:string;


    teacher:{
        firstName:string;
        lastName:string;
    };


    subject:{
        subjectName:string;
    };


    classroom:{
        name:string;
    };

}



export default function SchedulePage(){


    const [schedules,setSchedules] =
        useState<Schedule[]>([]);



    useEffect(()=>{


        fetch("http://localhost:3000/api/schedules")

        .then(res=>res.json())

        .then(data=>{

            setSchedules(
                data.data || []
            );

        })


    },[]);




    return (

        <Box>


            <Typography
                variant="h5"
                sx={{
                    mb:3
                }}
            >
                ตารางเรียน
            </Typography>



            <Button
                variant="contained"
                sx={{
                    mb:2
                }}
            >
                + เพิ่มตารางเรียน
            </Button>




            <TableContainer
                component={Paper}
            >

                <Table>


                    <TableHead>

                        <TableRow>

                            <TableCell>
                                วัน
                            </TableCell>


                            <TableCell>
                                เวลา
                            </TableCell>


                            <TableCell>
                                รายวิชา
                            </TableCell>


                            <TableCell>
                                ครูผู้สอน
                            </TableCell>


                            <TableCell>
                                ห้องเรียน
                            </TableCell>


                        </TableRow>

                    </TableHead>



                    <TableBody>


                    {
                        schedules.map((item)=>(


                            <TableRow
                                key={item.id}
                            >


                                <TableCell>
                                    {item.day}
                                </TableCell>



                                <TableCell>

                                    {item.startTime}

                                    {" - "}

                                    {item.endTime}

                                </TableCell>




                                <TableCell>

                                    {
                                    item.subject.subjectName
                                    }

                                </TableCell>




                                <TableCell>

                                    {
                                    item.teacher.firstName
                                    }

                                    {" "}

                                    {
                                    item.teacher.lastName
                                    }

                                </TableCell>




                                <TableCell>

                                    {
                                    item.classroom.name
                                    }

                                </TableCell>



                            </TableRow>


                        ))
                    }



                    </TableBody>


                </Table>


            </TableContainer>


        </Box>

    );

}