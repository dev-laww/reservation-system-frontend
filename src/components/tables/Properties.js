"use client";

import { useDisclosure } from "@mantine/hooks";
import {
    Modal,
    Table,
    Group,
    Text,
    ActionIcon,
    Button,
    rem,
} from "@mantine/core";
import { IconPencil, IconTrash, IconExternalLink } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { fetchData } from "@utils/http";
import { CreateProperty, EditProperty } from "../forms";
import { useSession } from "next-auth/react";

const Property = ({ item }) => {
    const { data: session } = useSession();
    const { name, price, id } = item;
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter();
    const handleDelete = async (id) => {
        await fetchData(
            `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`,
            {
                method: "DELETE",
            },
            session
        );

        router.refresh();
    };

    return (
        <>
            <Table.Tr>
                <Table.Td>
                    <Text fz="sm">{name}</Text>
                </Table.Td>
                <Table.Td>
                    <Text fz="sm">{name}</Text>
                </Table.Td>
                <Table.Td>
                    <Text fz="sm">${price.toFixed(2)} / month</Text>
                </Table.Td>
                <Table.Td>
                    <Group gap={0} justify="flex-end">
                        <ActionIcon variant="subtle" color="gray">
                            <IconPencil
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                                onClick={open}
                            />
                        </ActionIcon>
                        <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDelete(id)}
                        >
                            <IconTrash
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <ActionIcon
                            variant="subtle"
                            color="secondary"
                            onClick={() => router.push(`/properties/${id}`)}
                        >
                            <IconExternalLink
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Group>
                </Table.Td>
            </Table.Tr>
            <Modal opened={opened} onClose={close} title={name} centered>
                <EditProperty data={item} />
            </Modal>
        </>
    );
};

export default function Properties({ data }) {
    const rows =
        data.length > 0 ? (
            data.map((item) => <Property key={item.id} item={item} />)
        ) : (
            <Table.Tr>
                <Table.Td>
                    <Text fz="sm">No properties</Text>
                </Table.Td>
            </Table.Tr>
        );
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Group gap={0} justify="flex-end">
                <Button color="secondary" variant="light" onClick={open}>
                    Add Property
                </Button>
            </Group>
            <Table.ScrollContainer minWidth="100%">
                <Table verticalSpacing="md" highlightOnHover>
                    <Table.Tr>
                        <Table.Th>Property Name</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th />
                    </Table.Tr>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <Modal
                opened={opened}
                onClose={close}
                title="Add Property"
                centered
            >
                <CreateProperty />
            </Modal>
        </>
    );
}
