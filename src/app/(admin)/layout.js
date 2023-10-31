import { Container } from "@mantine/core";
import { Navigation } from "@src/components/common";

export const metadata = {
    title: "Reservation System",
    description: "Reservation System",
};

export default function Layout({ children }) {
    return (
        <>
            <Navigation />
            <Container size="md" mt="md">
                {children}
            </Container>
        </>
    );
}
