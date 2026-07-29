import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

import {
    People,
    School,
    Class,
    FactCheck
} from "@mui/icons-material";

import { useEffect, useState } from "react";


export default function ReportPage() {


    const [year,setYear] = useState(2569);

    const [semester,setSemester] = useState(1);



    const [reportData,setReportData] = useState({

        students:0,

        teachers:0,

        classrooms:0,

        attendanceRate:"0%"

    });



    useEffect(()=>{


        fetch(
            `http://localhost:3000/api/reports?year=${year}&semester=${semester}`
        )

        .then(res=>res.json())

        .then(data=>{


            if(data.data){

                setReportData(data.data);

            }


        })


        .catch(err=>{

            console.log(err);

        });


    },[year,semester]);





    const reports = [


        {
            title:"นักเรียนทั้งหมด",
            value:reportData.students,
            icon:<People fontSize="large"/>
        },


        {
            title:"ครูทั้งหมด",
            value:reportData.teachers,
            icon:<School fontSize="large"/>
        },


        {
            title:"ห้องเรียน",
            value:reportData.classrooms,
            icon:<Class fontSize="large"/>
        },


        {
            title:"การเข้าเรียน",
            value:reportData.attendanceRate,
            icon:<FactCheck fontSize="large"/>
        }


    ];





    return (

        <Box>


            <Typography

                variant="h5"

                sx={{
                    mb:3
                }}

            >

                รายงาน

            </Typography>





            {/* Filter */}

            <Box

                sx={{

                    display:"flex",

                    gap:2,

                    mb:3

                }}

            >


                <FormControl

                    sx={{
                        minWidth:200
                    }}

                >

                    <InputLabel>
                        ปีการศึกษา
                    </InputLabel>


                    <Select

                        value={year}

                        label="ปีการศึกษา"

                        onChange={(e)=>
                            setYear(
                                Number(e.target.value)
                            )
                        }

                    >


                        <MenuItem value={2568}>
                            2568
                        </MenuItem>


                        <MenuItem value={2569}>
                            2569
                        </MenuItem>


                        <MenuItem value={2570}>
                            2570
                        </MenuItem>


                    </Select>


                </FormControl>





                <FormControl

                    sx={{
                        minWidth:200
                    }}

                >


                    <InputLabel>
                        ภาคเรียน
                    </InputLabel>


                    <Select

                        value={semester}

                        label="ภาคเรียน"

                        onChange={(e)=>
                            setSemester(
                                Number(e.target.value)
                            )
                        }

                    >


                        <MenuItem value={1}>
                            ภาคเรียนที่ 1
                        </MenuItem>


                        <MenuItem value={2}>
                            ภาคเรียนที่ 2
                        </MenuItem>


                    </Select>


                </FormControl>



            </Box>







            {/* Report Cards */}


            <Grid

                container

                spacing={3}

            >



                {
                    reports.map((item)=>(


                        <Grid

                            size={{

                                xs:12,

                                sm:6,

                                md:3

                            }}

                            key={item.title}

                        >



                            <Card>


                                <CardContent>



                                    <Box

                                        sx={{

                                            display:"flex",

                                            alignItems:"center",

                                            gap:2

                                        }}

                                    >



                                        {item.icon}




                                        <Box>



                                            <Typography

                                                color="text.secondary"

                                            >

                                                {item.title}

                                            </Typography>





                                            <Typography

                                                variant="h4"

                                            >

                                                {item.value}

                                            </Typography>




                                        </Box>



                                    </Box>



                                </CardContent>


                            </Card>



                        </Grid>



                    ))
                }



            </Grid>



        </Box>

    );

}