"use client";

import { Modal, Button, TextInput, Rating, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { fetchData } from "@src/lib/utils/http";

export default function Review({ session, property_id }) {
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            comment: "",
            rating: 0,
        },
    });
    const handleClose = async () => {
        form.reset();
        close();
    };

    return (
        <>
            <Group justify="flex-end">
                <Button onClick={open} color="secondary" variant="light">
                    Leave a review
                </Button>
            </Group>
            <Modal
                opened={opened}
                onClose={handleClose}
                title="Leave a review"
                centered
            >
                <form
                    onSubmit={form.onSubmit(
                        async (values, _event) => {
                            await fetchData(
                                `${process.env.NEXT_PUBLIC_API_URL}/properties/${property_id}/reviews`,
                                {
                                    method: "POST",
                                    body: JSON.stringify(values),
                                },
                                session
                            );
                            await handleClose();
                        },
                        (validationErrors, _values, _event) => {
                            console.log(validationErrors);
                        }
                    )}
                >
                    <Rating
                        label="Rating"
                        value={form.values.rating}
                        onChange={(value) =>
                            form.setFieldValue("rating", value)
                        }
                        mb="sm"
                    />
                    <TextInput
                        multiline
                        placeholder="Leave a review"
                        label="Review"
                        required
                        value={form.values.comment}
                        onChange={(event) =>
                            form.setFieldValue(
                                "comment",
                                event.currentTarget.value
                            )
                        }
                    />
                    <Group mt="sm" justify="flex-end">
                        <Button type="submit" color="secondary">
                            Submit
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
