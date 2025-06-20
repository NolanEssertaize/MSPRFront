import { VStack, Button, Text } from "@chakra-ui/react";
import {FormInput} from "./formInput.tsx";
import {PasswordInput} from "./passwordInput.tsx";


export const RegisterForm = ({
                                 formData,
                                 onSubmit,
                                 onChange,
                                 isLoading,
                                 showPassword,
                                 onTogglePassword,
                                 onToggleMode
                             }) => (
    <form onSubmit={onSubmit} style={{ width: '80%' }}>
        <VStack spacing={8} w="100%">
            <FormInput
                name="username"
                value={formData.username}
                onChange={onChange}
                placeholder="Identifiant"
            />
            <FormInput
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="Email"
                type="email"
            />
            <FormInput
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="Numéro de téléphone"
                type="phone"

            />
            <PasswordInput
                name="password"
                value={formData.password}
                onChange={onChange}
                placeholder="Mot de passe"
                showPassword={showPassword}
                onTogglePassword={onTogglePassword}
            />
            <PasswordInput
                name="password2"
                value={formData.password2}
                onChange={onChange}
                placeholder="Confirmer le mot de passe"
                showPassword={showPassword}
                onTogglePassword={onTogglePassword}
            />
            <Button
                type="submit"
                colorScheme="green"
                isLoading={isLoading}
                width="100%"
            >
                Créer un compte
            </Button>
            <Text
                color="white"
                mt={4}
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={onToggleMode}
            >
                Déjà un compte ? Se connecter
            </Text>
        </VStack>
    </form>
);