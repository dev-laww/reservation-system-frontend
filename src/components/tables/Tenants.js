"use client";

import {
    Avatar,
    Table,
    Group,
    Text,
    ActionIcon,
    Modal,
    rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash, IconBell } from "@tabler/icons-react";
import { NotifyTenant } from "../forms";

const Tenant = ({ item }) => {
    const { first_name, last_name, email, phone_number } = item;
    const [notifyOpened, { open: notify, close: closeNotify }] =useDisclosure(false);
    
    const handleRemoveTenant = () => {
        console.log("Remove tenant");
    }

    return (
        <>
            <Table.Tr>
                <Table.Td>
                    <Group gap="sm">
                        <Avatar size={40} src={item.avatar} radius={40} />
                        <div>
                            <Text fz="sm" fw={500}>
                                {`${first_name} ${last_name}`}
                            </Text>
                            <Text c="dimmed" fz="xs">
                                {phone_number}
                            </Text>
                        </div>
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Text fz="sm">{email}</Text>
                    <Text fz="xs" c="dimmed">
                        Email
                    </Text>
                </Table.Td>
                <Table.Td>
                    <Group gap={0} justify="flex-end">
                        <ActionIcon variant="subtle" color="gray" onClick={notify}>
                            <IconBell
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="red" onClick={handleRemoveTenant}>
                            <IconTrash
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Group>
                </Table.Td>
            </Table.Tr>
            <Modal
                opened={notifyOpened}
                onClose={closeNotify}
                title="Notify tenant"
                centered
            >
                <NotifyTenant tenantId={item.id} close={closeNotify} />
            </Modal>
        </>
    );
};

export default function Tenants({ data }) {
    const rows = data.map((item) => <Tenant key={item.id} item={item} />);

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="md" highlightOnHover>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
