import { VStack, HStack, Text, Button } from "@chakra-ui/react";

export const AccountSettings = () => (
    <VStack align="start" my={6} spacing={4}>
        <Text fontWeight="bold" fontSize="lg">
            Compte
        </Text>
        <HStack justify="space-between" w="100%">
            <Text>Supprimer mon compte</Text>
            <Button colorScheme="red" size="sm">
                Supprimer
            </Button>
        </HStack>
    </VStack>
);