import { Input } from "@chakra-ui/react";

export const FormInput = ({ name, value, onChange, placeholder, type = "text" }) => (
    <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant="flushed"
        colorScheme="green"
        color="white"
        fontSize="1.5rem"
        type={type}
        required
    />
);