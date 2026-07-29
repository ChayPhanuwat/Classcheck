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


interface Subject {
    id: number;
    subjectCode: string;
    subjectName: string;
    credit: number;
}


export default function SubjectPage() {

    const [subjects, setSubjects] = useState<Subject[]>([]);


    useEffect(() => {

        fetch("http://localhost:3000/api/subjects")
            .then(res => res.json())
            .then(data => {
                setSubjects(data.data || []);
            })

    }, []);



    return (

        <Box>

            <Typography
                variant="h5"
                sx={{
                    mb: 3
                }}
            >
                รายวิชา
            </Typography>

            <Button
                variant="contained"
                sx={{ mb: 2 }}
            >
                + เพิ่มรายวิชา
            </Button>


            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                รหัสวิชา
                            </TableCell>

                            <TableCell>
                                ชื่อวิชา
                            </TableCell>

                            <TableCell>
                                หน่วยกิต
                            </TableCell>

                        </TableRow>

                    </TableHead>


                    <TableBody>

                        {
                            subjects.map((subject) => (

                                <TableRow key={subject.id}>

                                    <TableCell>
                                        {subject.subjectCode}
                                    </TableCell>


                                    <TableCell>
                                        {subject.subjectName}
                                    </TableCell>


                                    <TableCell>
                                        {subject.credit}
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