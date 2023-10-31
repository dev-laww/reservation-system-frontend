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
import { IconCircleOff, IconCheck } from "@tabler/icons-react";
import { upperFirst } from "@mantine/hooks";

const Payment = ({ item }) => {
    const { user, booking, id, status, amount, type } = item;

    const handlePaid = (id) => {
        console.log(id);
    };

    const handleCancelled = (id) => {
        console.log(id);
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
                    {upperFirst(status)}
                </Badge>
            </Table.Td>
            <Table.Td>${amount.toFixed(2)}</Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {booking.property.name}
                </Text>
                <Text fz="xs" c="dimmed">
                    {booking.property.address}
                </Text>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleCancelled(id)}
                        disabled={status !== "pending"}
                    >
                        <IconCircleOff
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        color="green"
                        onClick={() => handlePaid(id)}
                        disabled={status !== "pending"}
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
    const rows = data.map((item) => <Payment key={item.id} item={item} />);

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>User</Table.Th>
                        <Table.Th>Method</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Amount</Table.Th>
                        <Table.Th>Booking</Table.Th>
                        <Table.Th />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
