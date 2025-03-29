import { Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";

export const PasswordInput = ({ name, value, onChange, placeholder, showPassword, onTogglePassword }) => (
    <InputGroup size="md">
        <Input
            name={name}
            value={value}
            onChange={onChange}
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            variant="flushed"
            color="white"
            fontSize="1.5rem"
            required
        />
        <InputRightElement width="4.5rem">
            <IconButton
                colorScheme="whiteAlpha"
                h="1.75rem"
                size="sm"
                onClick={onTogglePassword}
                aria-label="Afficher/masquer mot de passe"
                variant="ghost"
                _hover={{ bgColor: "none" }}
                icon={
                    <i
                        className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}
                        style={{ color: "white" }}
                    />
                }
            />
        </InputRightElement>
    </InputGroup>
);