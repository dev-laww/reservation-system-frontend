"use client";

import {
    Paper,
    Title,
    Text,
    Button,
    Container,
    Group,
    PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./ResetPassword.module.css";

export default function ResetPassword({ token }) {
    const form = useForm({
        initialValues: { password: "", confirmPassword: "" },
        validate: {
            password: (value) =>
                value.length < 6 ? "Password is too short" : null,
            confirmPassword: (value, values) =>
                value !== values.password ? "Passwords do not match" : null,
        },
    });

    return (
        <Container size={460} my={30}>
            <Title className={classes.title} ta="center">
                Reset your password
            </Title>
            <Text c="dimmed" fz="sm" ta="center">
                Enter your new password
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
                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) =>
                            form.setFieldValue(
                                "password",
                                event.currentTarget.value
                            )
                        }
                        error={form.errors.password && "Password is too short"}
                        radius="md"
                    />
                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Your password"
                        value={form.values.confirmPassword}
                        onChange={(event) =>
                            form.setFieldValue(
                                "confirmPassword",
                                event.currentTarget.value
                            )
                        }
                        error={
                            form.errors.confirmPassword &&
                            "Passwords do not match"
                        }
                        radius="md"
                    />
                    <Group
                        justify="space-between"
                        mt="lg"
                        className={classes.controls}
                    >
                        <Button
                            className={classes.control}
                            color="secondary"
                            type="submit"
                            fullWidth
                        >
                            Reset password
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}
