import { fetchData, getSession } from "@utils/http";
import { Images } from "@components/common";

export default async function Property({ params }) {
    const { id } = params;
    const session = await getSession();

    const property = await fetchData(
        `${process.env.API_URL}/properties/${id}`,
        {},
        session
    );

    console.log(property);

    return (
        <>
            Property {params.id}
        </>
    );
}
