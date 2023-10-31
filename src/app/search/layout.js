import { Navigation } from "@components/common";

export const metadata = {
    title: "Reservation System - Search",
    description: "Reservation System - Search",
}

export default async function Layout({ children, searchParams }) {
    console.log(searchParams);
    return (
        <>
            <Navigation />
            {children}
        </>
    );
}
