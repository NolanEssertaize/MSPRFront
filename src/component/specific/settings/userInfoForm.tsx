import { VStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { FaSave } from "react-icons/fa";

export const UserInfoForm = () => (
    <VStack spacing={4} align="start">
        <FormControl>
            <FormLabel>Nom</FormLabel>
            <Input placeholder="Votre nom" />
        </FormControl>

        <FormControl>
            <FormLabel>Prénom</FormLabel>
            <Input placeholder="Votre prénom" />
        </FormControl>

        <FormControl>
            <FormLabel>Numéro de téléphone</FormLabel>
            <Input placeholder="Votre numéro de téléphone" />
        </FormControl>

        <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Votre email" />
        </FormControl>

        <FormControl>
            <FormLabel>Adresse</FormLabel>
            <Input placeholder="Votre adresse" />
        </FormControl>

        <Button
            colorScheme="green"
            leftIcon={<FaSave />}
            w="100%"
            mt={4}
        >
            Mettre à jour
        </Button>
    </VStack>
);