import { Container, Grid } from "@mantine/core";
import { Navigation, GridCard } from "@src/components/common";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { fetchData } from "@utils/http";

export default async function Home({ searchParams }) {
    const session = await getServerSession(authOptions);
    const data = await fetchData(
        `${process.env.API_URL}/api/properties`,
        {},
        session
    );
    console.log(searchParams);
    const items = data.data.map((item) => (
        <GridCard key={item.id} item={item} />
    ));

    return (
        <>
            <Navigation />
            <Container size="md" mt="md">
                <Grid>{items}</Grid>
            </Container>
        </>
    );
}
