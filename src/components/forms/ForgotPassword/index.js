"use client";

import {
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import classes from "./ForgotPassword.module.css";

export default function ForgotPassword() {
    const form = useForm({
        initialValues: { email: "" },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
        },
    });

    return (
        <Container size={460} my={30}>
            <Title className={classes.title} ta="center">
                Forgot your password?
            </Title>
            <Text c="dimmed" fz="sm" ta="center">
                Enter your email to get a reset link
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <form
                    onSubmit={form.onSubmit(
                        (values, _event) => console.log(values),
                        (validationErrors, _values, _event) => {
                            console.log(validationErrors);
                        }
                    )}
                >
                    <TextInput
                        required
                        label="Your email"
                        placeholder="your@email.com"
                        value={form.values.email}
                        error={form.errors.email && "Please enter valid email"}
                        radius="md"
                        onChange={(event) =>
                            form.setFieldValue(
                                "email",
                                event.currentTarget.value
                            )
                        }
                    />
                    <Group
                        justify="space-between"
                        mt="lg"
                        className={classes.controls}
                    >
                        <Anchor
                            c="dimmed"
                            size="sm"
                            className={classes.control}
                            href="/auth"
                        >
                            <Center inline>
                                <IconArrowLeft
                                    style={{ width: rem(12), height: rem(12) }}
                                    stroke={1.5}
                                />
                                <Box ml={5}>Back to the login page</Box>
                            </Center>
                        </Anchor>
                        <Button
                            className={classes.control}
                            color="secondary"
                            type="submit"
                        >
                            Reset password
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}
