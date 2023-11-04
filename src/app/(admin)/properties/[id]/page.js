import { fetchData, getSession } from "@utils/http";
import { NotFound } from "@src/components";
import { Text, Divider, Group, Badge } from "@mantine/core";
import { Images, Reviews } from "@components/common";
import { Review, Rent } from "@src/components/forms";
import classes from "../Properties.module.css";
import { Rentals } from "@components/tables";

const Details = ({ data }) => {
    const { name, description, price, address, city, zip, state, type } =
        data;
    return (
        <>
            <div>
                <Group justify="space-between">
                    <Text className={classes.name}>{name}</Text>
                    <Rent data={data} />
                </Group>
                <Badge color="secondary">{type.replace("_", " ")}</Badge>
            </div>
            <div>
                <Text fz="xl" span fw={500} className={classes.price}>
                    Php{price.toFixed(2)}
                </Text>
                <Text span fz="sm" c="dimmed">
                    {" "}
                    / month
                </Text>
            </div>
            <Divider my="sm" />
            <Text className={classes.address}>
                {address}, {city}, {state} {zip}
            </Text>
            <Text className={classes.description} c="dimmed">
                {description}
            </Text>
        </>
    );
};

export default async function Property({ params }) {
    const { id } = params;
    const session = await getSession();

    const property = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`,
        {},
        session
    );
    const rentals = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}/rentals`,
        {},
        session
    );

    if (property.detail) return <NotFound />;

    const { data } = property;
    const { images, reviews, ...rest } = data;

    return (
        <>
            <Images data={images} />
            <Details data={rest} />
            <div>
                <Group justify="space-between" my="lg">
                    <Text fz="lg" fw={500}>
                        Reviews
                    </Text>
                    <Review session={session} property_id={id}/>
                </Group>
                <Reviews data={reviews} />
            </div>
            {session.user.admin && (
                <div className={classes.rentals}>
                    <Group justify="space-between" my="lg">
                        <Text fz="lg" fw={500}>
                            Rentals
                        </Text>
                    </Group>
                    {rentals.data?.length > 0 ? <Rentals data={rentals.data} /> : <Text>No rentals yet.</Text>}
                </div>
            )}
        </>
    );
}
