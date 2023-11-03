"use client";

import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { fetchData } from "@src/lib/utils/http";
import { useSession } from "next-auth/react";

export default function NotifyTenant({ tenantId, close }) {
    const { data: session } = useSession();
    const form = useForm({
        initialValues: {
            tenant: tenantId,
            message: "",
        },
        validate: {
            message: (val) => (val ? null : "Message is required"),
        },
    });

    const handleSubmit = async (values) => {
        await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/tenants/${values.tenant}/notifications`, {
                method: "POST",
                body: JSON.stringify({ message: values.message }),
            }, session)
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
