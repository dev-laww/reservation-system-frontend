"use client";

import {
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
} from "@mantine/core";
import { useRef } from "react";
import Autoplay from "embla-carousel-react";
import { Carousel } from "@mantine/carousel";
import classes from "./Review.module.css";

const Review = ({ data }) => {
    const { comment, user } = data;
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
    const autoplay = useRef(Autoplay());

    const items = data.map((item) => (
        <Carousel.Slide key={item.id}>
            <Review data={item} />
        </Carousel.Slide>
    ));

    return (
        <Carousel
        slideSize="70%"
            slideGap="md"
            loop
            align="center"
        >
            {items}
        </Carousel>
    );
}
