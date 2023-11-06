"use client";

import { Button, Modal, Grid, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

export default function EditProfile({ session }) {
    const { firstName, lastName, phoneNumber } = session.user;
    const form = useForm({
        initialValues: {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
        },
    });
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Button onClick={open} variant="default" mt="sm">
                Edit Profile
            </Button>
            <Modal
                opened={opened}
                onClose={close}
                title="Edit Profile"
                zIndex={1000000}
            >
                <form
                    onSubmit={form.onSubmit(
                        (values, _event) => console.log(values),
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
                </form>
                <Button color="secondary" fullWidth type="submit" mt="lg">
                    Update Profile
                </Button>
            </Modal>
        </>
    );
}
