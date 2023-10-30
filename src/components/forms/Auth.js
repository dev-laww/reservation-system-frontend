"use client";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Anchor,
    Stack,
} from "@mantine/core";

export default function Login(props) {
    const [type, toggle] = useToggle(["login", "register"]);
    const form = useForm({
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) =>
                val === "admin" && type === "login"
                    ? null
                    : val.length <= 6
                    ? "Password should include at least 6 characters"
                    : null,
            confirmPassword: (val) =>
                val !== form.values.password && type === "register"
                    ? "Passwords do not match"
                    : null,
        },
    });

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500}>
                {upperFirst(type)} to your account
            </Text>

            <form
                onSubmit={form.onSubmit(
                    (values, _event) => console.log(values),
                    (validationErrors, _values, _event) => {
                        console.log(validationErrors);
                    }
                )}
            >
                <Stack mt="xl">
                    {type === "register" && (
                        <>
                            <TextInput
                                required={type === "register"}
                                label="First Name"
                                placeholder="Your first name"
                                value={form.values.FirstName}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "firstName",
                                        event.currentTarget.value
                                    )
                                }
                                radius="md"
                                error={form.errors.firstName}
                            />
                            <TextInput
                                required={type === "register"}
                                label="Last Name"
                                placeholder="Your last name"
                                value={form.values.lastName}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "lastName",
                                        event.currentTarget.value
                                    )
                                }
                                error={form.errors.lastName}
                                radius="md"
                            />
                        </>
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="your@email.com"
                        value={form.values.email}
                        onChange={(event) =>
                            form.setFieldValue(
                                "email",
                                event.currentTarget.value
                            )
                        }
                        error={form.errors.email && "Invalid email"}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) =>
                            form.setFieldValue(
                                "password",
                                event.currentTarget.value
                            )
                        }
                        error={
                            form.errors.password &&
                            "Password should include at least 6 characters"
                        }
                        radius="md"
                    />

                    {type === "register" && (
                        <PasswordInput
                            required={type === "register"}
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
                    )}
                </Stack>

                <Group mt="xl" display="flex" style={{ flexDirection: "column", minWidth: "300px" }}>
                    <Button type="submit " radius="md" fullWidth color="secondary">
                        {upperFirst(type)}
                    </Button>
                    <Anchor
                        component="button"
                        type="button"
                        c="dimmed"
                        onClick={() => toggle()}
                        size="xs"
                    >
                        {type === "register"
                            ? "Already have an account? Login"
                            : "Don't have an account? Register"}
                    </Anchor>
                    {type === "login" && (
                        <Anchor
                            c="dimmed"
                            href="/auth/forgot-password"
                            size="xs"
                        >
                            Forgot password?
                        </Anchor>
                    )}
                </Group>
            </form>
        </Paper>
    );
}
