import { Center, Loader } from "@mantine/core";

export default function Loading() {
    return (
        <Center
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            <Loader color="secondary" />
        </Center>
    );
}
