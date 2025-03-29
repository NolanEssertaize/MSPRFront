import { useState } from "react";
import {
    Drawer,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    DrawerFooter,
    Textarea,
    Button,
    Text,
} from "@chakra-ui/react";

const MAX_LENGTH = 200;

const DrawerComment = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [comment, setComment] = useState("");

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value.slice(0, MAX_LENGTH)); // Empêche de dépasser la limite
    };

    const handleSendComment = () => {
        console.log("Commentaire envoyé:", comment);
        setComment(""); // Réinitialise le champ après l'envoi
    };

    return (
        <Drawer onClose={onClose} isOpen={isOpen} placement="right">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Commentaires</DrawerHeader>
                <DrawerBody>
                    <Textarea
                        placeholder="Écris ton commentaire..."
                        value={comment}
                        onChange={handleCommentChange}
                        size="md"
                        resize="none"
                    />
                    <Text fontSize="sm" color="gray.500" mt={1} textAlign="right">
                        {MAX_LENGTH - comment.length} caractères restants
                    </Text>
                </DrawerBody>
                <DrawerFooter>
                    <Button colorScheme="green" isDisabled={comment.trim().length === 0} onClick={handleSendComment}>
                        Envoyer
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerComment;
