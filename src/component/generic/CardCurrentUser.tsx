import {
    Card,
    CardBody,
    Flex,
    Avatar,
    Text,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Image, useDisclosure,
} from "@chakra-ui/react";
import {FaComment} from "react-icons/fa";
import DrawerComment from "../specific/Comment/DrawerComment.tsx";

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
}

interface CardCurrentUserProps {
    plant: Plant;
}

const CardCurrentUser = ({ plant }: CardCurrentUserProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>

        <Card
            position="relative"
            variant="elevation"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            width={80}
            height={350}
        >
            {/* Main Card Body - Image Area */}
            <CardBody p="0">
                <Image
                    src={`http://localhost:8000/${plant.photo_url}`}
                    alt={plant.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                />
                <Flex
                    position="absolute"
                    bottom="50px"
                    left="0"
                    right="0"
                    p="2"
                    mb={3}
                    bg="rgba(0, 0, 0, 0.4)"
                    color="white"
                    flexDirection="column"
                >
                    <Text fontSize="lg" fontWeight="bold">{plant.name}</Text>
                </Flex>
            </CardBody>

            {/* User Info Bar */}
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
                    <Avatar src="" />
                    <Text color="white" fontSize="sm">Owner</Text>
                </Flex>

                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<i
                            className="fa-solid fa-bars" style={{ fontSize: "1.25rem", color: "black" }}/>}
                        variant={'ghost'}
                    />
                    <MenuList>
                        <MenuItem icon={<i
                            className="fa-solid fa-pen"/>}>
                            Edit
                        </MenuItem>
                        <MenuItem icon={<i
                            className="fa-solid fa-trash"/>} >
                            Delete
                        </MenuItem>
                        <MenuItem icon={<FaComment />}
                                  onClick={onOpen}>
                            Comment
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Card>

    <DrawerComment isOpen={isOpen} onClose={onClose} />
</>
    );
};

export default CardCurrentUser;