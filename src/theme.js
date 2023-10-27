'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
    colors: {
        'primary': [
            "#DAC0A3",
            "#D9BF9E",
            "#D8BE99",
            "#D7BD94",
            "#D6BC8F",
            "#D5BB8A",
            "#D4BA85",
            "#D3B97F",
            "#D2B87A",
            "#D1B775",
            "#D0B670"
        ],
        'secondary': [
            "#102C57",
            "#1A3E6E",
            "#254F85",
            "#30509B",
            "#3B61B2",
            "#4662C9",
            "#5163E0",
            "#5C74F6",
            "#6775FD",
            "#7276FF",
        ],
        'background': [
            "#F8F0E5",
            "#F7EFE0",
            "#F6EEDB",
            "#F5EED6",
            "#F4EDD1",
            "#F3ECCC",
            "#F2EBC7",
            "#F1EAC2",
            "#F0E9BD",
            "#EFE8B8",
            "#EEE7B3"
        ]
    },
    headings: {
        fontFamily: "Poppins, sans-serif",
        sizes: {
            h1: {
                fontWeight: 600,
                fontSize: '2.25rem',
                lineHeight: '2.75rem'
            },
            h2: {
                fontWeight: 600,
                fontSize: '1.875rem',
                lineHeight: '2.25rem'
            },
            h3: {
                fontWeight: 600,
                fontSize: '1.5rem',
                lineHeight: '1.75rem'
            },
            h4: {
                fontWeight: 600,
                fontSize: '1.3125rem',
                lineHeight: '1.6rem',
            },
            h5: {
                fontWeight: 600,
                fontSize: '1.125rem',
                lineHeight: '1.6rem',
            },
            h6: {
                fontWeight: 600,
                fontSize: '1rem',
                lineHeight: '1.2rem',
            },

        }
    }
});