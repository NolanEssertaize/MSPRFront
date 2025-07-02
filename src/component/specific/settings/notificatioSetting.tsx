import { VStack, HStack, Text, Switch } from "@chakra-ui/react";

export const NotificationSettings = () => (
    <VStack align="start" my={6} spacing={4}>
        <Text fontWeight="bold" fontSize="lg">
            Notifications
        </Text>
        <HStack justify="space-between" w="100%">
            <Text>Notifications push</Text>
            <Switch colorScheme="green" />
        </HStack>
        <HStack justify="space-between" w="100%">
            <Text>Notifications email</Text>
            <Switch colorScheme="green" />
        </HStack>
    </VStack>
);