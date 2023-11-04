"use client";

import { ActionIcon, Menu, Indicator } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { fetchData } from "@utils/http";
import { useEffect, useState } from "react";

export default function Notification() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const handleRead = async (id) => {
        const data = await fetchData(
            `${
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
            }/profile/notifications/${id}`,
            { method: "PUT" },
            session
        );

        console.log(data);

        if (data?.status === 200) {
            setNotifications(
                notifications.map((notification) => {
                    if (notification.id === id) {
                        notification.seen = true;
                    }

                    return notification;
                })
            );
        }
    };

    useEffect(() => {
        if (!session) return;

        const abortController = new AbortController();

        const fetchNotifications = async () => {
            const data = await fetchData(
                `${
                    process.env.NEXT_PUBLIC_API_URL || `http://127.0.0.1:8000`
                }/profile/notifications`,
                {},
                session
            );

            setNotifications(data?.data || null);
        };

        fetchNotifications();

        return () => abortController.abort();
    }, [session, open]);

    return (
        <Menu
            shadow="md"
            opened={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            position="bottom-end"
            width={300}
        >
            <Menu.Target>
                <ActionIcon size="lg" variant="default">
                    <Indicator  size={6} color="secondary" disabled={!notifications.some((notification) => !notification.seen)}>
                        <IconBell stroke={1} />
                    </Indicator>
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                {notifications?.length > 0 ? (
                    notifications.map((notification) => (
                        <Menu.Item
                            key={notification.id}
                            onClick={() => handleRead(notification.id)}
                            disabled={notification.seen}
                        >
                            <Indicator size={6} color="secondary" disabled={notification.seen}>
                            {notification.message}
                            </Indicator>
                        </Menu.Item>
                    ))
                ) : (
                    <Menu.Item>No notifications</Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}
