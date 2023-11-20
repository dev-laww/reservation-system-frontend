"use client";

import { useState, useEffect } from "react";
import { Button, Modal, Box, Select, TextInput, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { MonthPicker } from "@mantine/dates";
import { useSession } from "next-auth/react";

export default function Rent({ data }) {
    const { data: session } = useSession();
    const { id, occupied } = data;
    const [month, setMonth] = useState([null, null]);
    const form = useForm({
        initialValues: {
            start_date: month[0],
            end_date: month[1],
            payment_type: "",
            amount: 0,
        },
    });
    const [opened, { open, close }] = useDisclosure(false);
    const min = new Date();
    min.setMonth(min.getMonth() - 1);

    const handleSubmit = async () => {
        const { start_date, end_date, payment_type, amount } = form.values;
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}/rentals`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    start_date,
                    end_date,
                    payment_type,
                    amount,
                }),
            },
            session
        );

        const data = await response.json();
        
        if (data.detail) {
            alert(data.detail);
        } else {
            alert("Successfully rented!");
            close();
        }
    };

    useEffect(() => {
        form.setValues({
            start_date: month[0],
            end_date: month[1],
        });
    }, [month]);

    console.log(session);

    return (
        <>
            <Button
                onClick={open}
                color="secondary"
                disabled={occupied || session?.user.admin}
            >
                {occupied ? "Not Available" : "Rent"}
            </Button>
            <Modal
                opened={opened}
                onClose={close}
                title="Select your rental duration"
            >
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <MonthPicker
                        color="secondary"
                        type="range"
                        defaultDate={new Date()}
                        value={month}
                        minDate={min}
                        onChange={setMonth}
                    />
                </Box>
                <Select
                    fullWidth
                    label="Payment Method"
                    placeholder="Pick value"
                    value={form.values.payment_type}
                    onChange={(value) =>
                        form.setFieldValue("payment_type", value)
                    }
                    data={[
                        {
                            value: "ewallet",
                            label: "GCash",
                        },
                        {
                            value: "cash",
                            label: "Cash",
                        },
                    ]}
                />
                {form.values.payment_type === "ewallet" && (
                    <Image
                        my="lg"
                        src="/images/gcash.png"
                        alt="GCash"
                        width={100}
                        height={100}
                    />
                )}
                <TextInput
                    fullWidth
                    label="Amount"
                    placeholder="Enter amount"
                    value={form.values.amount}
                    onChange={(event) =>
                        form.setFieldValue("amount", event.currentTarget.value)
                    }
                />
                <Button
                    color="secondary"
                    fullWidth
                    onClick={handleSubmit}
                    mt="lg"
                >
                    Rent
                </Button>
            </Modal>
        </>
    );
}
