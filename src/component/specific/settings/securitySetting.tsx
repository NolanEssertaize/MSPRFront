import { VStack, HStack, Text, IconButton } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";

export const SecuritySettings = () => (
    <VStack align="start" my={6} spacing={4}>
        <Text fontWeight="bold" fontSize="lg">
            Sécurité
        </Text>
        <HStack justify="space-between" w="100%">
            <Text>Changer le mot de passe</Text>
            <IconButton
                aria-label="Modifier le mot de passe"
                icon={<FaLock />}
                variant="ghost"
                colorScheme="green"
            />
        </HStack>
    </VStack>
);