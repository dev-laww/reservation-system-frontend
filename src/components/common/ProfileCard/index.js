import { signOut } from "next-auth/react";
import { Card, Avatar, Text, Button } from "@mantine/core";
import classes from "./ProfileCard.module.css";

export default function ProfileCard({ session, user }) {
    const { firstName, lastName, phoneNumber, email } = session.user;

    return (
        <Card withBorder padding="sm" radius="md" className={classes.card}>
            <Avatar
                src=""
                size={50}
                radius={80}
                mx="auto"
                className={classes.avatar}
            />
            <Text ta="center" fz="lg" fw={500} mt="sm">
                {`${firstName} ${lastName}`}
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
                {email}
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
                {phoneNumber}
            </Text>
            <Button fullWidth mt="sm" variant="default" component="a" href="/profile/edit">
                Edit Profile
            </Button>
            <Button
                fullWidth
                mt="sm"
                variant="default"
                onClick={() => signOut({ callbackUrl: "/auth" })}
            >
                Logout
            </Button>
        </Card>
    );
}
