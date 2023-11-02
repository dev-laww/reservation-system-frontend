"use client";

import {
    Card as MantineCard,
    Image,
    Text,
    Grid,
    Group,
    Button,
    rem,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconStar } from "@tabler/icons-react";
import classes from "./Card.module.css";

export default function Card({ data }) {
    const { images, name, price, city, description, id } = data;
    const slides = images.map((image) => (
        <Carousel.Slide key={image.id}>
            <Image src={image.url} alt={name} />
        </Carousel.Slide>
    ));

    return (
        <MantineCard withBorder radius="md" p="md" className={classes.card}>
            <MantineCard.Section>
                <Carousel
                    withIndicators
                    loop
                    classNames={{
                        root: classes.carousel,
                        controls: classes.carouselControls,
                        indicator: classes.carouselIndicator,
                    }}
                >
                    {slides}
                </Carousel>
            </MantineCard.Section>

            <Group justify="space-between" mt="lg">
                <Text fw={500} fz="lg">
                    {name}, {city}
                </Text>

                <Group gap={5}>
                    <IconStar style={{ width: rem(16), height: rem(16) }} />
                    <Text fz="xs" fw={500}>
                        4.78
                    </Text>
                </Group>
            </Group>

            <Text fz="sm" c="dimmed" mt="sm" truncate="end">
                {description}
            </Text>

            <Group justify="space-between" mt="md">
                <div>
                    <Text fz="xl" span fw={500} className={classes.price}>
                        ${price.toFixed(2)}
                    </Text>
                    <Text span fz="sm" c="dimmed">
                        {" "}
                        / night
                    </Text>
                </div>

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
    );
}

export function GridCard({ item }) {
    return (
        <Grid.Col span={{ sm: 12, md: 6, lg: 4 }}>
            <Card data={item} />
        </Grid.Col>
    );
}
