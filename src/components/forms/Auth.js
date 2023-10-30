"use client";

import { useEffect } from "react";
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
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login(props) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session]);

    const [type, toggle] = useToggle(["login", "register"]);
    const form = useForm({
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            passwordConfirmation: "",
            phoneNumber: "",
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) =>
                val === "admin" && type === "login"
                    ? null
                    : val.length <= 6
                    ? "Password should include at least 6 characters"
                    : null,
            passwordConfirmation: (val) =>
                val !== form.values.password && type === "register"
                    ? "Passwords do not match"
                    : null,
            phoneNumber: (val) => 
                val.length < 11 && type === "register" && !(/((\+63)|0)[.\- ]?9[0-9]{2}[.\- ]?[0-9]{3}[.\- ]?[0-9]{4}/.test(val))
                    ? "Invalid phone number"
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
                    async (values, _event) => {
                        if (type == "login") {
                            const result = await signIn("credentials", {
                                redirect: false,
                                email: values.email,
                                password: values.password, 
                            });

                            if (!result.ok) {
                                form.setErrors({
                                    email: "Invalid email or password",
                                    password: "Invalid email or password",
                                });
                                
                            }

                        } else {
                            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(values),
                            })

                            const res = await result.json()

                            if (result.status !== 200 && res.detail === "Email already exists") {
                                form.setFieldError("email", res.detail)
                            } else {
                                await signIn("credentials", {
                                    email: values.email,
                                    password: values.password, 
                                });

                                router.push("/")
                            }
                        }
                    },
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
                            <TextInput
                                required={type === "register"}
                                label="Phone Number"
                                placeholder="09123456789"
                                value={form.values.phoneNumber}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "phoneNumber",
                                        event.currentTarget.value
                                    )
                                }
                                error={form.errors.phoneNumber && "Invalid phone number"}
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
                        error={form.errors.email}
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
                        error={form.errors.password}
                        radius="md"
                    />

                    {type === "register" && (
                        <PasswordInput
                            required={type === "register"}
                            label="Confirm Password"
                            placeholder="Your password"
                            value={form.values.passwordConfirmation}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "passwordConfirmation",
                                    event.currentTarget.value
                                )
                            }
                            error={
                                form.errors.passwordConfirmation &&
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
