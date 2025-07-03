import React, { useState, useEffect } from "react";
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
    Spinner, Card, CardHeader, Avatar, Box, CardBody, Tooltip, IconButton
} from "@chakra-ui/react";

const MAX_LENGTH = 200;

type CommentType = {
    id: number;
    comment: string;
    time_stamp: string;
    user: {
        _decrypted_username: string;
        is_botanist: boolean;
    };
};
const API_BASE = "http://localhost:8000";
const DrawerComment = ({
                           isOpen,
                           onClose,
                           plantId,
                       }: {
    isOpen: boolean;
    onClose: () => void;
    plantId: number;
}) => {
    const [comment, setComment] = useState("");
    const [currentUser, setCurrentUser] = useState(null)
    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState(false);

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value.slice(0, MAX_LENGTH));
    };
    // const fetchMe = async () => {
    //     try {
    //         const res = await fetch(`${API_BASE}/user/me`,{
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`
    //             },
    //         });
    //         if (!res.ok) throw new Error("Erreur réseau");
    //         const data = await res.json();
    //         setCurrentUser(data);
    //     }catch(err){
    //         console.error("", err);
    //     }
    // }
    // console.log(currentUser)
    const fetchComments = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/plants/${plantId}/comments/`);
            if (!res.ok) throw new Error("Erreur réseau");
            const data = await res.json();
            setComments(data);
        } catch (err) {
            console.error("Erreur lors du chargement des commentaires", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSendComment = async () => {
        if (comment.trim().length === 0) return;
        try {
            await fetch(`${API_BASE}/comments/?plant_id=${plantId}&comment=${encodeURIComponent(comment.trim())}`, {
                method: "POST" ,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },});

            setComment("");
            await fetchComments();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchComments();
            // fetchMe()
        }
    }, [isOpen]);

    return (
        <Drawer onClose={onClose} isOpen={isOpen} placement="right" size={"sm"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Commentaires</DrawerHeader>
                <DrawerBody>
                    {loading ? (
                        <Spinner />
                    ) : comments.length === 0 ? (
                        <Text color="gray.500">Aucun commentaire pour le moment.</Text>
                    ) : (
                        comments.map((c) => (
                            <>
                                <Card key={c.id} marginTop={4} borderColor={"black"} variant ={"outline"} backgroundColor={"gray.200"} size={"sm"}>
                                    <CardHeader display="flex" justifyContent="space-between">
                                        <Box display={"flex"} gap={4}>
                                            <Avatar name={c.user._decrypted_username} size={"sm"}/>
                                            <Text fontWeight="bold">{c.user._decrypted_username}{c.user?.is_botanist && (
                                                <Tooltip label='Botanniste'>
                                                    <i className="fa-solid fa-circle-check" style={{color: "black", marginLeft : "5px"}}></i>
                                                </Tooltip>
                                            )}</Text>


                                        </Box>
                                            {/*<Box>*/}
                                            {/*    <IconButton*/}
                                            {/*        icon={<i className="fa-solid fa-pen"/>}*/}
                                            {/*        aria-label={'Modifier'}*/}
                                            {/*        size={"sm"}*/}
                                            {/*        variant={"ghost"}*/}
                                            {/*    />*/}
                                            {/*    <IconButton*/}
                                            {/*        icon={<i className="fa-solid fa-trash"/>}*/}
                                            {/*        aria-label={'Supprimer'}*/}
                                            {/*        size={"sm"}*/}
                                            {/*        variant={"ghost"}*/}
                                            {/*    />*/}
                                            {/*</Box>*/}
                                    </CardHeader>
                                    <CardBody>
                                        <Text fontSize="sm" color="gray.600">
                                            {new Date(c.time_stamp).toLocaleString("fr-FR")}
                                        </Text>
                                        <Text>{c.comment}</Text>
                                    </CardBody>
                                </Card>

                            </>
                        ))
                    )}
                </DrawerBody>
                <DrawerFooter display={"grid"} w={400}>
                    <Textarea
                        borderColor={"green"}
                        placeholder="Écris ton commentaire..."
                        value={comment}
                        onChange={handleCommentChange}
                        size="lg"
                        resize="none"
                    />
                    <Text fontSize="sm" color="gray.500" mt={1} textAlign="right">
                        {MAX_LENGTH - comment.length} caractères restants
                    </Text>
                    <Button colorScheme="green" isDisabled={comment.trim().length === 0} onClick={handleSendComment}>
                        Envoyer
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerComment;
