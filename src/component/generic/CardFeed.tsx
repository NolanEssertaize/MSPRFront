import {
    Card,
    CardBody,
    Flex,
    Avatar,
    Text,
    IconButton,
    useDisclosure,
    Image,
    Heading,
    Badge,
    useToast
} from "@chakra-ui/react";
import { useState } from "react";
import DrawerComment from "../specific/Comment/DrawerComment.tsx";

interface Owner {
    email: string;
    phone: string;
    username: string;
    id: number;
    is_active: boolean;
    is_botanist: boolean;
}

interface Plant {
    name: string;
    location: string;
    care_instructions: string;
    id: number;
    photo_url: string;
    owner_id: number;
    created_at: string;
    in_care: boolean;
    plant_sitting: number | null;
    owner?: Owner;
}

interface PlantProps {
    plant: Plant;
}

const CardFeed = ({ plant }: PlantProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLiked, setIsLiked] = useState(plant.in_care);
    const toast = useToast();

    const handleHeartClick = async () => {
        const endpoint = isLiked
            ? `http://localhost:8000/plants/${plant.id}/start-care`
            : `http://localhost:8000/plants/${plant.id}/end-care`;

        try {
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer YOUR_TOKEN`,
                },
            });

            if (response.ok) {
                setIsLiked(!isLiked);
                toast({
                    title: isLiked ? "Soin terminé." : "Soin démarré.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            } else {
                throw new Error("Erreur lors de la mise à jour des soins");
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Erreur",
                description: "Impossible de mettre à jour le soin de la plante.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const getImageUrl = (url: string) => {
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            return url;
        }
        if (url && !url.startsWith('/')) {
            return `http://${url}`;
        }
        return url || "/placeholder-plant.jpg";
    };

    return (
        <>
            <Card
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                width={80}
                height={350}
                position="relative"
            >
                <IconButton
                    icon={
                        <i
                            className={`fa-${isLiked ? "solid" : "regular"} fa-heart`}
                            style={{
                                fontSize: "1.25rem",
                                color: isLiked ? "red" : "black",
                            }}
                        ></i>
                    }
                    variant="ghost"
                    position="absolute"
                    top="2"
                    right="2"
                    aria-label="Like"
                    size="sm"
                    zIndex="1"
                    onClick={handleHeartClick}
                />

                {/* Image de la plante */}
                <CardBody p={3}>
                    <Image
                        src={getImageUrl(plant.photo_url)}
                        alt={plant.name}
                        objectFit="cover"
                        height="200px"
                        width="100%"
                        fallbackSrc="/placeholder-plant.jpg"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder-plant.jpg";
                        }}
                    />
                    <Heading size="md" mb={1}>{plant.name}</Heading>

                    {isLiked && (
                        <Badge colorScheme="blue" mb={2}>En attente</Badge>
                    )}

                    <Text fontSize="sm" color="gray.600" mb={2}>
                        <b>Lieu:</b> {plant.location}
                    </Text>

                    <Flex justifyContent="space-between" alignItems="center" mt="auto">
                        <Flex alignItems="center">
                            <Avatar size="xs" mr={2} name={plant.owner?.username} />
                            <Text fontSize="sm">{plant.owner?.username}</Text>
                        </Flex>
                    </Flex>
                </CardBody>

                <Flex
                    bg={'#337418'}
                    p="2"
                    align="center"
                    justify="space-between"
                    position="absolute"
                    bottom="0"
                    width="100%"
                >
                    <Flex align="center" gap="2">
                        <Avatar name={plant.owner?.username} />
                        <Text fontSize="lg" fontWeight={"bold"} color={"white"}>{plant.owner?.username}</Text>
                    </Flex>
                    <IconButton
                        icon={<i className="fa-regular fa-comment-dots" style={{ fontSize: "1.25rem", color: "white" }}></i>}
                        variant="ghost"
                        onClick={onOpen}
                        colorScheme="green"
                        color={'white'}
                        aria-label="Commentaires"
                    />
                </Flex>
            </Card>
            <DrawerComment isOpen={isOpen} onClose={onClose} plantId={plant.id} />
        </>
    );
};

export default CardFeed;
