"use client";

import { Button, TextInput, Grid, Text, Select } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { fetchData } from "@src/lib/utils/http";

const File = ({ file, onClick }) => {
    return (
        <Button
            component={Button}
            mt="sm"
            rightSection={<IconX />}
            style={{
                pointerEvents: "all",
            }}
            color="secondary"
            variant="outline"
            onClick={onClick}
        >
            <div style={{ maxWidth: "200px" }}>
                <Text size="sm" truncate="end">
                    {file.name}
                </Text>
            </div>
        </Button>
    );
};

export default function CreateProperty({ close }) {
    const { data: session } = useSession();
    const openRef = useRef(null);
    const [files, setFiles] = useState([]);
    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            type: "",
            price: 0,
        },
    });

    const handleSubmit = async (values) => {
        const resp = await fetchData(
            `${process.env.NEXT_PUBLIC_API_URL}/properties`,
            {
                method: "POST",
                body: JSON.stringify(values),
            },
            session
        );

        const promises = [];

        for (const image of files) {
            const formData = new FormData();
            formData.append("image", image)

            promises.push(
                fetchData(
                    `${process.env.NEXT_PUBLIC_API_URL}/properties/${resp.data.id}/images`,
                    {
                        method: "POST",
                        body: formData,
                    },
                    session,
                    true
                )
            );
        }

        Promise.all(promises).then((promises) => {
            close();
            window.location.reload();
        });
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
                <Grid cols={2} gap="md">
                    <Grid.Col span={{ sm: 12 }}>
                        <TextInput
                            required
                            label="Name"
                            value={form.values.name}
                            error={form.errors.name}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "name",
                                    event.currentTarget.value
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={{ sm: 12 }}>
                        <TextInput
                            required
                            label="Description"
                            multiline
                            value={form.values.description}
                            error={form.errors.description}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "description",
                                    event.currentTarget.value
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={{ sm: 12, md: 6 }}>
                        <TextInput
                            required
                            label="Address"
                            value={form.values.address}
                            error={form.errors.address}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "address",
                                    event.currentTarget.value
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={{ sm: 12, md: 6 }}>
                        <TextInput
                            required
                            label="City"
                            value={form.values.city}
                            error={form.errors.city}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "city",
                                    event.currentTarget.value
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={{ sm: 12, md: 6 }}>
                        <TextInput
                            required
                            label="State"
                            value={form.values.state}
                            error={form.errors.state}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "state",
                                    event.currentTarget.value
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={{ sm: 12, md: 6 }}>
                        <TextInput
                            required
                            label="Zip"
                            value={form.values.zip}
                            error={form.errors.zip}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "zip",
                                    event.currentTarget.value
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={{ sm: 12, md: 6 }}>
                        <TextInput
                            required
                            label="Price"
                            value={form.values.price}
                            error={form.errors.price}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "price",
                                    event.currentTarget.value
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={{ sm: 12, md: 6 }}>
                        <Select
                            searchable
                            label="Type"
                            placeholder="Pick value"
                            value={form.values.type}
                            onChange={(value) =>
                                form.setFieldValue("type", value)
                            }
                            data={[
                                {
                                    value: "house",
                                    label: "Whole House",
                                },
                                {
                                    value: "studio",
                                    label: "Studio",
                                },
                                {
                                    value: "1_bedroom",
                                    label: "1 Bedroom",
                                },
                                {
                                    value: "2_bedroom",
                                    label: "2 Bedroom",
                                },
                            ]}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ sm: 12 }}>
                        <Text mb="sm">Upload Images</Text>
                        <Dropzone
                            onDrop={(files) =>
                                setFiles((prev) => [...prev, ...files])
                            }
                            onReject={(files) =>
                                console.log("rejected files", files)
                            }
                            accept={IMAGE_MIME_TYPE}
                            activateOnClick={false}
                            openRef={openRef}
                        >
                            <Button
                                onClick={() => openRef.current?.()}
                                style={{ pointerEvents: "all" }}
                                color="secondary"
                                variant="light"
                            >
                                Select files
                            </Button>
                            {files.map((file) => (
                                <File
                                    key={file.name}
                                    file={file}
                                    onClick={() =>
                                        setFiles((prev) =>
                                            prev.filter((f) => f !== file)
                                        )
                                    }
                                />
                            ))}
                        </Dropzone>
                    </Grid.Col>
                </Grid>
                <Button type="submit" radius="md" color="secondary" mt="md">
                    Create
                </Button>
            </form>
        </>
    );
}
