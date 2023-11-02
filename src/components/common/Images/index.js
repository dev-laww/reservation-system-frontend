"use client";

import { Image, rem} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import classes from "./Images.module.css";

export default function Images({ data }) {
    const slides = data.map((image) => (
        <Carousel.Slide key={image.id}>
            <Image src={image.url} alt="asdasd" />
        </Carousel.Slide>
    ));

    return (
        <Carousel withIndicators loop height={rem(400)} classNames={classes}>
            {slides}
        </Carousel>
    );
}
