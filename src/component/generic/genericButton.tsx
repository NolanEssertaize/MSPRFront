import { Button, ButtonProps, forwardRef } from "@chakra-ui/react";
import { ReactElement } from "react";

interface GenericButtonProps extends Omit<ButtonProps, "leftIcon" | "rightIcon"> {
    label: string;
    leftIcon?: ReactElement<any, any>;
    rightIcon?: ReactElement<any, any>;
    bg?: string;
}

const GenericButton = forwardRef<GenericButtonProps, "button">(
    ({ label, leftIcon, rightIcon, bg, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                bg={'#337418'}
                colorScheme={"green"}
                {...props}
            >
                {label}
            </Button>
        );
    }
);

export default GenericButton;
