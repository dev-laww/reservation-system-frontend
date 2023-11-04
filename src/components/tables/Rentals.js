"use client";

import {
    Avatar,
    Badge,
    Table,
    Group,
    Text,
    ActionIcon,
    rem,
} from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { upperFirst } from "@mantine/hooks";
import { useSession } from "next-auth/react";

const Rental = ({ item }) => {
    const { data: session } = useSession();
    const { user, id, status, payment, start_date, end_date } = item;

    const handlePaid = async (paymentId) => {
    };

    const handleCancelled = async (paymentId) => {
    };

    const handleAccept = async (id) => {};

    const handleReject = async (id) => {};

    return (
        <Table.Tr>
            <Table.Td>
                <Group gap="xs">
                    <div>
                        <Text fz="sm" fw={500}>
                            {`${user.first_name} ${user.last_name}`}
                        </Text>
                        <Text fz="xs" c="dimmed">
                            {user.email}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {start_date.split("T")[0]}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {end_date.split("T")[0]}
                </Text>
            </Table.Td>
            <Table.Td>
                <Badge
                    color={
                        payment.status === "paid"
                            ? "secondary"
                            : payment.status === "pending"
                            ? "orange"
                            : "red"
                    }
                >
                    {upperFirst(payment.status)}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Badge
                    color={
                        status === "approved"
                            ? "secondary"
                            : status === "pending"
                            ? "orange"
                            : "red"
                    }
                >
                    {upperFirst(status)}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Group justify="center">
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleCancelled(payment.id)}
                        disabled={payment.status !== "pending"}
                    >
                        <IconX
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        color="green"
                        onClick={() => handlePaid(payment.id)}
                        disabled={payment.status !== "pending"}
                    >
                        <IconCheck
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Group>
            </Table.Td>
            <Table.Td>
                <Group justify="center">
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleReject(id)}
                        disabled={status !== "pending" || payment.status !== "paid"}
                    >
                        <IconX
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        color="green"
                        onClick={() => handleAccept(id)}
                        disabled={status !== "pending" || payment.status !== "paid"}
                    >
                        <IconCheck
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    );
};

export default function Rentals({ data }) {
    const rows = data.map((item) => <Rental key={item.id} item={item} />);

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>User</Table.Th>
                        <Table.Th>Start Date</Table.Th>
                        <Table.Th>End Date</Table.Th>
                        <Table.Th>Payment Status</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Payment Actions</Table.Th>
                        <Table.Th>Rental Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
