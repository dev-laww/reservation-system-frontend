import { fetchData } from "@utils/http";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { Paper } from "@mantine/core";
import { Tenants as TenantTable } from "@components/tables";
import classes from "./Tenants.module.css";

export default async function Tenants() {
    const session = await getServerSession(authOptions);
    const tenants = await fetchData(
        `${process.env.API_URL}/api/tenants`,
        {},
        session
    );

    return (
        <Paper shadow="sm" padding="md" className={classes.paper}>
            <TenantTable data={tenants.data} />
        </Paper>
    );
}
