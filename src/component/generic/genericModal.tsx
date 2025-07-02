import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalProps,
    Button
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface GenericModalProps extends Omit<ModalProps, "children"> {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
    children: ReactNode;
    onCancel?: () => void;
    onConfirm?: () => void;
}

const GenericModal: FC<GenericModalProps> = ({
                                                 isOpen,
                                                 onClose,
                                                 title = "Titre de la modal",
                                                 size = "md",
                                                 children,
                                                 onCancel,
                                                 onConfirm,
                                                 ...modalProps
                                             }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size} {...modalProps}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onCancel || onClose}>
                        Annuler
                    </Button>
                    <Button colorScheme="green" bg={'#337418'} ml={3} onClick={onConfirm}>
                        Valider
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default GenericModal;
