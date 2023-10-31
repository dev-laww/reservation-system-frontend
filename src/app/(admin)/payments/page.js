import { Paper } from "@mantine/core";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { fetchData } from "@utils/http";
import { Payments as PaymentsTable } from "@components/tables";
import classes from "./Payments.module.css";

export default async function Payments() {
    const session = await getServerSession(authOptions);
    const payments = await fetchData(
        `${process.env.API_URL}/api/payments`,
        {},
        session
    );

    console.log(payments);
    console.log(payments.data[0].user);
    console.log(payments.data[0].booking);

    return (
        <Paper shadow="sm" padding="md" className={classes.paper}>
            <PaymentsTable data={payments.data} />
        </Paper>
    );
}
