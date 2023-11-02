"use client";

import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function NotifyTenant({ tenantId, close }) {
    const form = useForm({
        initialValues: {
            tenant: tenantId,
            message: "",
        },
        validate: {
            message: (val) => (val ? null : "Message is required"),
        },
    });

    const handleSubmit = (values) => {
        console.log(values);
        close();
    };

    return (
        <>
            <form
                onSubmit={form.onSubmit(
                    (values, _events) => handleSubmit(values),
                    (validationErrors, _values, _event) => {
                        console.log(validationErrors);
                    }
                )}
            >
                <TextInput
                    label="Message"
                    placeholder={form.values.message}
                    value={form.values.message}
                    error={form.errors.message}
                    onChange={(event) =>
                        form.setFieldValue("message", event.currentTarget.value)
                    }
                />
                <Button
                    type="submit"
                    variant="light"
                    radius="md"
                    color="secondary"
                    mt="md"
                >
                    Notify
                </Button>
            </form>
        </>
    );
}
