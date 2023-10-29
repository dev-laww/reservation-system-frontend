import { Center } from "@mantine/core";

export const metadata = {
    title: "Reservation System - Auth",
    description: "Reservation System - Auth",
};

export default function Layout({ children }) {
    return (
        <Center
            style={{
                height: "100vh",
                width: "100vw",
            }}
        >
            {children}
        </Center>
    );
}
