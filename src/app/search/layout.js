import { Container, Grid } from "@mantine/core";
import { Navigation, GridCard } from "@components/common";
import { Filters } from "@components/forms";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { fetchData } from "@utils/http";

export const metadata = {
    title: "Reservation System - Search",
    description: "Reservation System - Search",
}

export default async function Layout({ children, searchParams }) {
    return (
        <>
            <Navigation />
            <Filters searchParams={searchParams} />
            {children}
        </>
    );
}
