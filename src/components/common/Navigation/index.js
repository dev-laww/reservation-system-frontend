"use client";

import cx from "clsx";
import { useState } from "react";
import {
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
    rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconUser,
    IconLogout,
    IconSettings,
    IconChevronDown,
} from "@tabler/icons-react";
import { useSession, signOut } from "next-auth/react";
import classes from "./Navigation.module.css";

const tabs = ["Home", "Properties", "Tenants", "Bookings", "Payments"];

export default function Navigation() {
    const { data: session, status } = useSession();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab} key={tab}>
            {tab}
        </Tabs.Tab>
    ));

    return (
        <div className={classes.header}>
            <Container className={classes.mainSection} size="md">
                <Group justify="space-between">
                    <IconUser />

                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="xs"
                        size="sm"
                    />

                    <Menu
                        width={260}
                        position="bottom-end"
                        transitionProps={{ transition: "pop-top-right" }}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <UnstyledButton
                                className={cx(classes.user, {
                                    [classes.userActive]: userMenuOpened,
                                })}
                            >
                                <Group gap={7}>
                                    <Avatar radius="xl" size={20} />
                                    <Text fw={500} size="sm" lh={1} mr={3}>
                                        {`${
                                            session
                                                ? session?.user.firstName
                                                : ""
                                        } ${
                                            session
                                                ? session?.user.lastName
                                                : ""
                                        }`}
                                    </Text>
                                    <IconChevronDown
                                        style={{
                                            width: rem(12),
                                            height: rem(12),
                                        }}
                                        stroke={1.5}
                                    />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Settings</Menu.Label>
                            <Menu.Item
                                leftSection={
                                    <IconSettings
                                        style={{
                                            width: rem(16),
                                            height: rem(16),
                                        }}
                                        stroke={1.5}
                                    />
                                }
                            >
                                Profile
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconLogout
                                        style={{
                                            width: rem(16),
                                            height: rem(16),
                                        }}
                                        stroke={1.5}
                                    />
                                }
                                onClick={() =>
                                    signOut({ callbackUrl: "/auth" })
                                }
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>
            <Container size="md">
                <Tabs
                    defaultValue="Home"
                    variant="outline"
                    visibleFrom="sm"
                    classNames={{
                        root: classes.tabs,
                        list: classes.tabsList,
                        tab: classes.tab,
                    }}
                >
                    <Tabs.List>{items}</Tabs.List>
                </Tabs>
            </Container>
        </div>
    );
}
