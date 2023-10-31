import { Paper } from "@mantine/core";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { fetchData } from "@utils/http";
import { Properties as PropertiesTable } from "@components/tables";
import classes from "./Properties.module.css";

export default async function Properties() {
    const session = await getServerSession(authOptions);

    const properties = await fetchData(
        `${process.env.API_URL}/api/properties`,
        {},
        session
    );

    return (
        <Paper shadow="sm" padding="md" className={classes.paper} p="xs" >
            <PropertiesTable data={properties.data} />
        </Paper>
    );
}
