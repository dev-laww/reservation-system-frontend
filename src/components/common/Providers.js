"use client";

import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "@src/theme";

function Provider({ children }) {
    return (
        <SessionProvider>
            <MantineProvider theme={theme}>{children}</MantineProvider>
        </SessionProvider>
    );
}

export default Provider;
