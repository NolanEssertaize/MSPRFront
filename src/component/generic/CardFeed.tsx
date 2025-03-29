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
    Badge
} from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";
import DrawerComment from "../specific/Comment/DrawerComment.tsx";

interface PlantProps {
    plant: {
        name: string;
        location: string;
        care_instructions: string;
        id: number;
        photo_url: string;
        owner_id: number;
        created_at: string;
        in_care: boolean;
        plant_sitting: number | null;
    }
}

const CardFeed = ({ plant }: PlantProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Card maxW="100%" position="relative" overflow="hidden" boxShadow="md" height="100%">
                {/* Heart Icon */}
                <IconButton
                    icon={<FaHeart />}
                    variant="ghost"
                    position="absolute"
                    top="2"
                    right="2"
                    color="gray.600"
                    _hover={{ color: "red.500" }}
                    aria-label="Like"
                    size="sm"
                    zIndex="1"
                />

                {/* Main Card Body - Image Area */}
                <Image
                    src={plant.photo_url || "/placeholder-plant.jpg"}
                    alt={plant.name}
                    objectFit="cover"
                    height="200px"
                    width="100%"
                />

                <CardBody p={3}>
                    <Heading size="md" mb={1}>{plant.name}</Heading>

                    {plant.in_care && (
                        <Badge colorScheme="green" mb={2}>En gardiennage</Badge>
                    )}

                    <Text fontSize="sm" color="gray.600" mb={2}>
                        <b>Lieu:</b> {plant.location}
                    </Text>

                    <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
                        {plant.care_instructions}
                    </Text>

                    {/* User Info Bar */}
                    <Flex justifyContent="space-between" alignItems="center" mt="auto">
                        <Flex alignItems="center">
                            <Avatar size="xs" mr={2} />
                            <Text fontSize="sm">Propriétaire #{plant.owner_id}</Text>
                        </Flex>
                        <IconButton
                            icon={<FaComment />}
                            variant="ghost"
                            onClick={onOpen}
                            colorScheme="green"
                            size="sm"
                            aria-label="Commentaires"
                        />
                    </Flex>
                </CardBody>
            </Card>

            {/* Drawer pour les commentaires */}
            <DrawerComment isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default CardFeed;