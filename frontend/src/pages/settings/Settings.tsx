import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Button
} from "@mui/material";


import {
    School,
    CalendarMonth,
    Person,
    Lock
} from "@mui/icons-material";



export default function SettingsPage(){


    const settings = [

        {
            title:"ข้อมูลโรงเรียน",
            description:"จัดการชื่อโรงเรียนและข้อมูลพื้นฐาน",
            icon:<School fontSize="large"/>
        },


        {
            title:"ปีการศึกษา / ภาคเรียน",
            description:"กำหนดปีการศึกษาและภาคเรียนปัจจุบัน",
            icon:<CalendarMonth fontSize="large"/>
        },


        {
            title:"ผู้ใช้งาน",
            description:"จัดการบัญชีและสิทธิ์ผู้ใช้งาน",
            icon:<Person fontSize="large"/>
        },


        {
            title:"เปลี่ยนรหัสผ่าน",
            description:"แก้ไขรหัสผ่านของบัญชี",
            icon:<Lock fontSize="large"/>
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

                ตั้งค่า

            </Typography>





            <Grid

                container

                spacing={3}

            >



            {
                settings.map((item)=>(


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

                                        gap:2,

                                        mb:2

                                    }}

                                >


                                    {item.icon}


                                    <Typography

                                        variant="h6"

                                    >

                                        {item.title}

                                    </Typography>


                                </Box>




                                <Typography

                                    color="text.secondary"

                                    sx={{
                                        mb:2
                                    }}

                                >

                                    {item.description}


                                </Typography>




                                <Button

                                    variant="contained"

                                >

                                    จัดการ

                                </Button>



                            </CardContent>



                        </Card>



                    </Grid>


                ))
            }



            </Grid>



        </Box>

    );

}