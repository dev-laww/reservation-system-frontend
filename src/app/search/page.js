import { Container, Grid } from "@mantine/core";
import { GridCard } from "@components/common";
import { Filters } from "@components/forms";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { fetchData } from "@utils/http";

export default async function Search({ searchParams }) {
    console.log(searchParams);
    const session = await getServerSession(authOptions);
    const params = new URLSearchParams(searchParams);
    const data = await fetchData(
        `${process.env.API_URL}/properties?${params.toString()}`,
        {},
        session
    );
    const items = data.data.map((item) => (
        <GridCard key={item.id} item={item} />
    ));

    return (
        <>
            <Filters searchParams={searchParams} />
            <Container size="md" mt="md">
                <Grid>{items}</Grid>
            </Container>
        </>
    );
}
