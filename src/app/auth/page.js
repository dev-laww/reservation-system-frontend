import { Center, Flex } from "@mantine/core";
import { Auth as AuthForm } from "@src/components/forms";

export default function Auth() {
    return (
        <Center
            style={{
                height: "100vh",
                width: "100vw",
            }}
        >
            <AuthForm />
        </Center>
    );
}
