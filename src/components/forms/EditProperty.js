"use client";

import {
    Button,
    TextInput,
    Grid,
    Text,
    Image,
    Box,
    Flex,
    Select,
    rem,
} from "@mantine/core";
import { IconX, IconTrash } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";

const File = ({ name, onClick }) => {
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
                    {name}
                </Text>
            </div>
        </Button>
    );
};

export default function EditProperty({ data }) {
    const { data: session } = useSession();
    const {
        name,
        description,
        address,
        city,
        state,
        zip,
        type,
        price,
        images,
    } = data;
    const openRef = useRef(null);
    const [files, setFiles] = useState([]);
    const form = useForm({
        initialValues: {
            name,
            description,
            address,
            city,
            state,
            zip,
            type,
            price: price,
        },
    });

    const handleSubmit = (values) => {
        console.log(values);
        console.log(files);
    };

    const handleDelete = (id) => {
        console.log("delete image", id);
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
                    <Grid.Col>
                        <Text mb="sm">Images</Text>
                        <Flex gap="md" wrap="wrap" align="center">
                            {images.map((image) => (
                                <Box key={image.id} span={{ sm: 12, md: 6 }}>
                                    <Image
                                        src={image.url}
                                        alt={name}
                                        h={150}
                                        w={150}
                                    />
                                    <Button
                                        variant="outline"
                                        color="red"
                                        rightSection={
                                            <IconTrash
                                                style={{
                                                    width: rem(16),
                                                    height: rem(16),
                                                }}
                                                stroke={1.5}
                                            />
                                        }
                                        fullWidth
                                        mt="sm"
                                        onClick={() => handleDelete(image.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            ))}
                        </Flex>
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
                                    name={file.name}
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
                    Save
                </Button>
            </form>
        </>
    );
}
