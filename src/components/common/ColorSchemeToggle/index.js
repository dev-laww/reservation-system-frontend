"use client";

import cx from 'clsx';
import {
    Group,
    useMantineColorScheme,
    useComputedColorScheme,
    ActionIcon,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import classes from "./ColorSchemeToggle.module.css";

export default function ColorSchemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    return (
        <Group>
            <ActionIcon
                onClick={() =>
                    setColorScheme(
                        computedColorScheme === "light" ? "dark" : "light"
                    )
                }
                variant="default"
                size="lg"
            >
                <IconSun
                    className={cx(classes.icon, classes.light)}
                    stroke={1.5}
                />
                <IconMoon
                    className={cx(classes.icon, classes.dark)}
                    stroke={1.5}
                />
            </ActionIcon>
        </Group>
    );
}
