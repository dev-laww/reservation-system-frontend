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
import { fetchData } from "@src/lib/utils/http";

const Payment = ({ item }) => {
    const { data: session } = useSession();
    const { user, rental, id, status, amount, type } = item;

    const handlePaid = async (id) => {
        await fetchData(
            `${process.env.NEXT_PUBLIC_API_URL}/payments/${id}/paid`,
            {
                method: "POST",
            },
            session
        );

        window.location.reload();
    };

    const handleCancelled = async (id) => {
        await fetchData(
            `${process.env.NEXT_PUBLIC_API_URL}/payments/${id}/declined`,
            {
                method: "POST",
            },
            session
        );

        window.location.reload();
    };

    return (
        <Table.Tr>
            <Table.Td>
                <Group gap="xs">
                    <Avatar size={40} radius={40} />
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
            <Table.Td>{upperFirst(type)}</Table.Td>
            <Table.Td>
                <Badge
                    color={
                        status === "paid"
                            ? "secondary"
                            : status === "pending"
                            ? "orange"
                            : "red"
                    }
                >
                    {upperFirst(status === "declined" ? "not paid" : status)}
                </Badge>
            </Table.Td>
            <Table.Td>${amount.toFixed(2)}</Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {rental.property.name}
                </Text>
                <Text fz="xs" c="dimmed">
                    {rental.property.address}
                </Text>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleCancelled(id)}
                    >
                        <IconX
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        color="green"
                        onClick={() => handlePaid(id)}
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

export default function Payments({ data }) {
    const rows =
        data.length > 0 ? (
            data.map((item) => <Payment key={item.id} item={item} />)
        ) : (
            <Table.Tr>
                <Table.Td>
                    <Text fz="sm">No payments</Text>
                </Table.Td>
            </Table.Tr>
        );

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>User</Table.Th>
                        <Table.Th>Method</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Amount</Table.Th>
                        <Table.Th>Rental</Table.Th>
                        <Table.Th />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
