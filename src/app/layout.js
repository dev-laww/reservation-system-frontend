import "@mantine/core/styles.css";
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import React from "react";
import { ColorSchemeScript } from "@mantine/core";
import { Provider, Navigation, ColorSchemeToggle } from "@components/common";

export const metadata = {
    title: "Reservation System",
    description: "Reservation System",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    );
}
