import { VStack, Button, Text } from "@chakra-ui/react";
import {FormInput} from "./formInput.tsx";
import {PasswordInput} from "./passwordInput.tsx";


export const LoginForm = ({
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
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="E-mail"
            />
            <PasswordInput
                name="password"
                value={formData.password}
                onChange={onChange}
                placeholder="Mot de passe"
                showPassword={showPassword}
                onTogglePassword={onTogglePassword}
            />
            <Button
                type="submit"
                colorScheme="green"
                isLoading={isLoading}
                width="100%"
            >
                Se connecter
            </Button>
            <Text
                color="white"
                mt={4}
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={onToggleMode}
            >
                Pas encore de compte ? Créer un compte
            </Text>
        </VStack>
    </form>
);