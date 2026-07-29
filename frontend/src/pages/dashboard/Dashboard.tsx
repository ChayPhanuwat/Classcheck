import {
    Grid,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

const cards = [
    { title: "Students", total: 350 },
    { title: "Teachers", total: 20 },
    { title: "Classrooms", total: 30 },
    { title: "Subjects", total: 15 },
];

export default function Dashboard() {
    return (
        <>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                {cards.map((card) => (
                    <Grid size={{ xs: 12, md: 3 }} key={card.title}>
                        <Card>
                            <CardContent>
                                <Typography>{card.title}</Typography>

                                <Typography
                                    component="h2"
                                    variant="h4"
                                >
                                    {card.total}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}