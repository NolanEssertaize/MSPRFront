import { VStack, HStack, Text, Select } from "@chakra-ui/react";

export const GeneralSettings = () => (
    <VStack align="start" mb={6} spacing={4}>
        <Text fontWeight="bold" fontSize="lg">
            Général
        </Text>

        <HStack justify="space-between" w="100%" >
            <Text>Langue</Text>
            <Select placeholder="Sélectionner la langue" colorScheme="green" isDisabled>
                <option value="fr">Français</option>
                <option value="en">Anglais</option>
                <option value="es">Espagnol</option>
            </Select>
        </HStack>
    </VStack>
);