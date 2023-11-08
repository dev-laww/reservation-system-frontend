"use client";

import {
    Button,
    Grid,
    TextInput,
    Container,
    Title,
    Paper,
    Text
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { fetchData } from "@src/lib/utils/http";
import { useRouter } from "next/navigation";
import classes from "./EditProfile.module.css";

export default function EditProfile({ session }) {
    const { firstName, lastName, phoneNumber } = session.user;
    const router = useRouter();
    const form = useForm({
        initialValues: {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
        },
    });

    return (
        <Container size={460} my={30}>
            <Title className={classes.title} ta="center">
                Edit Profile
            </Title>
            <Text c="dimmed" fz="sm" ta="center">
                Changes will apply on next login
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <form
                    onSubmit={form.onSubmit(
                        (values, _event) => {
                            fetchData(
                                `${process.env.NEXT_PUBLIC_API_URL}/profile`,
                                {
                                    method: "PUT",
                                    body: JSON.stringify(values),
                                },
                                session
                            ).then((res) => router.push("/"));
                        },
                        (validationErrors, _values, _event) =>
                            console.log(validationErrors)
                    )}
                >
                    <Grid cols={2} gap="md">
                        <Grid.Col span={{ sm: 12, md: 6 }}>
                            <TextInput
                                fullWidth
                                label="First Name"
                                placeholder="First Name"
                                value={form.values.firstName}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "firstName",
                                        event.currentTarget.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 6 }}>
                            <TextInput
                                fullWidth
                                label="Last Name"
                                placeholder="Last Name"
                                value={form.values.lastName}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "lastName",
                                        event.currentTarget.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12 }}>
                            <TextInput
                                fullWidth
                                label="Phone Number"
                                placeholder="Phone Number"
                                value={form.values.phoneNumber}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "phoneNumber",
                                        event.currentTarget.value
                                    )
                                }
                            />
                        </Grid.Col>
                    </Grid>
                    <Button color="secondary" fullWidth type="submit" mt="lg">
                        Update Profile
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
