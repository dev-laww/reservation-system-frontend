"use client";

import {
    TextInput,
    Select,
    Button,
    Grid,
    Group,
    Container,
    Collapse,
    rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function Filters({ searchParams }) {
    const form = useForm({
        initialValues: searchParams,
    });
    const [opened, { toggle }] = useDisclosure(false);
    const router = useRouter();

    return (
        <Container pt={rem(20)}>
            <Group
                style={{
                    width: "100%",
                    marginBottom: rem(20),
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <Button
                    type="submit"
                    variant="light"
                    radius="md"
                    onClick={toggle}
                    color="secondary"
                >
                    {opened ? "Hide" : "Show"} filters
                </Button>
            </Group>
            <Collapse in={opened}>
                <form
                    onSubmit={form.onSubmit((values, _events) => {
                        const params = new URLSearchParams(values);
                        toggle();
                        router.push(`/search?${params.toString()}`);
                    })}
                >
                    <Grid>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
                            <TextInput
                                label="Min Price"
                                placeholder={form.values.min_price}
                                value={form.values.min_price}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "min_price",
                                        event.currentTarget.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
                            <TextInput
                                label="Max Price"
                                placeholder={form.values.max_price}
                                value={form.values.max_price}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "max_price",
                                        event.currentTarget.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
                            <TextInput
                                label="Price"
                                placeholder={form.values.price}
                                value={form.values.price}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "price",
                                        event.currentTarget.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
                            <TextInput
                                label="Min Occupancy"
                                placeholder={form.values.min_occupancy}
                                value={form.values.min_occupancy}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "min_ccupancy",
                                        event.currentTarget.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
                            <TextInput
                                label="Max Occupancy"
                                placeholder={form.values.max_occupancy}
                                value={form.values.max_occupancy}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "max_ccupancy",
                                        event.currentTarget.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
                            <TextInput
                                label="Occupancy"
                                placeholder={form.values.occupancy}
                                value={form.values.occupancy}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "occupancy",
                                        event.currentTarget.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
                            <Select
                                searchable
                                label="Sort by"
                                placeholder="Pick value"
                                value={form.values.sort}
                                onChange={(value) =>
                                    form.setFieldValue("sort", value)
                                }
                                data={[
                                    {
                                        value: "price",
                                        label: "Price",
                                    },
                                    {
                                        value: "max_occupancy",
                                        label: "Max Occupancy",
                                    },
                                ]}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
                            <Select
                                searchable
                                label="Order by"
                                placeholder="Pick value"
                                value={form.values.order}
                                onChange={(value) =>
                                    form.setFieldValue("order", value)
                                }
                                data={[
                                    {
                                        value: "asc",
                                        label: "Ascending",
                                    },
                                    {
                                        value: "desc",
                                        label: "Descending",
                                    },
                                ]}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
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
                    </Grid>
                    <Group
                        style={{
                            width: "100%",
                            marginTop: rem(20),
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                        gap={10}
                    >
                        <Button
                            variant="light"
                            radius="md"
                            color="secondary"
                            onClick={() => {
                                router.push("/");
                                form.setValues((prev) => ({}));
                                toggle();
                                router.refresh();
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            variant="light"
                            radius="md"
                            color="secondary"
                        >
                            Apply
                        </Button>
                    </Group>
                </form>
            </Collapse>
        </Container>
    );
}
