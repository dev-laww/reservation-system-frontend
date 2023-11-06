import { Container, Grid } from "@mantine/core";
import { Navigation, GridCard } from "@components/common";
import { Filters } from "@components/forms";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { fetchData } from "@utils/http";

export default async function Home({ searchParams }) {
    const session = await getServerSession(authOptions);
    const data = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/properties`,
        {},
        session
    );

    const items = data.data.map((item) => (
        <GridCard key={item.id} item={item} />
    ));

    return (
        <>
            <Navigation />
            <Filters searchParams={searchParams} />
            <Container size="md" mt="md">
                <Grid>{items}</Grid>
            </Container>
        </>
    );
}
