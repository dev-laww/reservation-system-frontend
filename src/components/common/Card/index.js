"use client";

import {
    Card as MantineCard,
    Image,
    Text,
    Grid,
    Group,
    Badge,
    Button,
    HoverCard,
} from "@mantine/core";
import classes from "./Card.module.css";

export default function Card({ data }) {
    const { images, name, price, city, description, id } = data;

    return (
        <HoverCard openDelay={1000}>
            <HoverCard.Target>
                <MantineCard
                    withBorder
                    radius="md"
                    p="md"
                    className={classes.card}
                >
                    <MantineCard.Section>
                        <Image src={images[0].url} alt={name} height={120} />
                    </MantineCard.Section>

                    <MantineCard.Section className={classes.section} mt="md">
                        <Group justify="space-between">
                            <Text fz="sm" fw={500}>
                                {name}
                            </Text>
                            <Badge size="sm" variant="light" color="secondary">
                                {city}
                            </Badge>
                        </Group>
                    </MantineCard.Section>

                    <MantineCard.Section className={classes.section}>
                        <Text mt="md" className={classes.label} c="dimmed">
                            {price} per night
                        </Text>
                    </MantineCard.Section>

                    <Group mt="xs">
                        <Button
                            radius="md"
                            color="secondary"
                            fullWidth
                            component="a"
                            href={`/properties/${id}`}
                        >
                            Show details
                        </Button>
                    </Group>
                </MantineCard>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Text>{description}</Text>
            </HoverCard.Dropdown>
        </HoverCard>
    );
}

export function GridCard({ item }) {
    return (
        <Grid.Col span={{ sm: 12, md: 6, lg: 3 }}>
            <Card data={item} />
        </Grid.Col>
    );
}
