"use client";

import {
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
    Rating,
    rem,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import classes from "./Review.module.css";

const Review = ({ data }) => {
    const { comment, user, rating } = data;
    const { first_name, last_name, email } = user;
    return (
        <Paper withBorder radius="md" className={classes.comment}>
            <Group>
                <Avatar src="" radius="xl" />
                <div>
                    <Text fz="sm">{`${first_name} ${last_name}`}</Text>
                    <Text fz="xs" c="dimmed">
                        {email}
                    </Text>
                </div>
            </Group>
            <Rating value={rating} readOnly mt="md" ml={rem(54)} />
            <TypographyStylesProvider className={classes.body}>
                <div
                    className={classes.content}
                    dangerouslySetInnerHTML={{
                        __html: comment,
                    }}
                />
            </TypographyStylesProvider>
        </Paper>
    );
};

export default function Reviews({ data }) {
    const items = data.map((item) => (
        <Carousel.Slide key={item.id}>
            <Review data={item} />
        </Carousel.Slide>
    ));

    return (
        <Carousel slideSize="70%" slideGap="md" loop align="center" withControls={data.length > 0} style={{
            minHeight: rem(300)
        }}>
            {data.length > 0 ? items : <Text c="dimmed">No reviews yet.</Text>}
        </Carousel>
    );
}
