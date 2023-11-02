"use client";

import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Rent({ propertyId }) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Button onClick={open} color="secondary">
                Rent
            </Button>
            <Modal opened={opened} onClose={close} title="Rent">
        
            </Modal>
        </>
    )
}
