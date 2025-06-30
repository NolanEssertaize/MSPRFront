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
    Image,
    Heading,
    Badge,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Switch,
    useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";

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

interface CardCurrentUserProps {
    plant: Plant;
    onUpdate: (updatedPlant: Plant) => void;
}

const CardCurrentUser = ({ plant, onUpdate }: CardCurrentUserProps) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [formData, setFormData] = useState({
        name: plant.name,
        location: plant.location,
        care_instructions: plant.care_instructions || "",
        in_care: plant.in_care,
        photo: null as File | null,
    });

    const fetchPlants = async () => {
        try {
            const response = await fetch('http://localhost:8000/my_plants/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch plants');
            }

            const data = await response.json();
        } catch (error) {
            toast({
                title: 'Error fetching plants',
                description: error instanceof Error ? error.message : 'Unknown error occurred',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    fetchPlants();

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const getImageUrl = (url: string) => {

        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            return url;
        }


        if (url && !url.startsWith('/')) {
            return `http://${url}`;
        }

        return url || "/placeholder-plant.jpg";
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            in_care: e.target.checked
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({
                ...prev,
                photo: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDelete = async () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${plant.name} ?`)) {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    toast({
                        title: "Erreur",
                        description: "Vous devez être connecté pour effectuer cette action",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                    return;
                }

                const response = await fetch(`http://localhost:8000/plants?plant_id=${plant.id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "Erreur lors de la suppression");
                }

                toast({
                    title: "Succès",
                    description: `La plante "${plant.name}" a été supprimée avec succès`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                window.location.reload();
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue";

                toast({
                    title: "Erreur de suppression",
                    description: errorMessage,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });

                console.error("Erreur lors de la suppression:", error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast({
                    title: "Erreur",
                    description: "Vous devez être connecté pour effectuer cette action",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }


            const formDataToSend = new FormData();

            formDataToSend.append("name", formData.name);
            formDataToSend.append("location", formData.location);
            formDataToSend.append("care_instructions", formData.care_instructions);
            // formDataToSend.append("in_care", formData.in_care.toString());
            if (formData.photo) {
                formDataToSend.append("photo", formData.photo);
            }

            const response = await fetch(`http://localhost:8000/plants/${plant.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formDataToSend
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Erreur lors de la mise à jour");
            }

            const updatedPlant = await response.json();

            toast({
                title: "Succès",
                description: `La plante "${plant.name}" a été mise à jour avec succès`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            if (onUpdate) {
                onUpdate(updatedPlant);
            }
            console.log(formDataToSend)
            await fetchPlants();
            onClose();

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue";

            toast({
                title: "Erreur de mise à jour",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
            });

            console.error("Erreur lors de la mise à jour:", error);
        }

    };

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
                <CardBody p={3}>
                    <Image
                        src={getImageUrl(plant.photo_url)}
                        alt={plant.photo_url}
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

                    {plant.in_care && (
                        <Badge colorScheme="blue" mb={2}>En attente</Badge>
                    )}

                    <Text fontSize="sm" color="gray.600" mb={2}>
                        <b>Lieu:</b> {plant.location}
                    </Text>
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
                        <Avatar name={plant.owner?._decrypted_username}  />
                        <Text color="white" fontSize="lg" fontWeight={'bold'}>{plant.owner?._decrypted_username}</Text>
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
                            <MenuItem
                                icon={<i className="fa-solid fa-pen"/>}
                                onClick={onOpen}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                icon={<i className="fa-solid fa-trash"/>}
                                onClick={handleDelete}
                            >
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Card>

            {/* Edit Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modifier {plant.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <FormControl mb={4}>
                                <FormLabel>Nom</FormLabel>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Nom de la plante"
                                />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel>Lieu</FormLabel>
                                <Input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="Lieu de la plante"
                                />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel>Instructions d'entretien</FormLabel>
                                <Textarea
                                    name="care_instructions"
                                    value={formData.care_instructions}
                                    onChange={handleInputChange}
                                    placeholder="Instructions d'entretien"
                                />
                            </FormControl>

                            <FormControl mb={4} display="flex" alignItems="center">
                                <FormLabel htmlFor="in-care" mb="0">
                                    En attente d'entretien
                                </FormLabel>
                                <Switch
                                    id="in-care"
                                    colorScheme={'green'}
                                    isChecked={formData.in_care}
                                    onChange={handleSwitchChange}
                                />
                            </FormControl>

                            <FormControl mb={4}>
                                <FormLabel>Photo</FormLabel>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {photoPreview && (
                                    <Image
                                        src={photoPreview}
                                        alt="Preview"
                                        mt={2}
                                        maxH="200px"
                                        borderRadius="md"
                                    />
                                )}
                            </FormControl>

                            <Flex justify="flex-end" gap={3} mt={6}>
                                <Button variant="ghost" onClick={onClose}>Annuler</Button>
                                <Button colorScheme="green" type="submit">Enregistrer</Button>
                            </Flex>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CardCurrentUser;