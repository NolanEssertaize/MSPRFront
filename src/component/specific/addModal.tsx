import React, { useRef, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Textarea,
    VStack,
    Image,
    Flex,
    useToast
} from "@chakra-ui/react";
import GenericModal from "../generic/genericModal.tsx";

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddModal = ({ isOpen, onClose }: AddModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        care_instructions: '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);

            const url = URL.createObjectURL(file);
            setPreviewUrls([...previewUrls, url]);
        }
    };

    const handleAdd = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async () => {
        try {
            const queryParams = new URLSearchParams({
                name: formData.name,
                location: formData.location,
                care_instructions: formData.care_instructions
            });

            const submitData = new FormData();
            if (selectedFile) {
                submitData.append('photo', selectedFile);
            }

            console.log('URL params:', queryParams.toString());

            const response = await fetch(`http://localhost:8000/plants/?${queryParams}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },                body: submitData // On envoie uniquement la photo dans le body
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to submit plant');
            }

            const result = await response.json();
            toast({
                title: 'Plant added successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            window.location.reload();
            onClose();
        } catch (error) {
            toast({
                title: 'Error adding plant',
                description: error instanceof Error ? error.message : 'Unknown error occurred',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <GenericModal
            isOpen={isOpen}
            onClose={onClose}
            title="Ajouter une plante"
            size="lg"
            onConfirm={handleSubmit}
        >
            <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                    <FormLabel>Nom</FormLabel>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Entrez le nom de la plante"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Instructions d'entretien</FormLabel>
                    <Textarea
                        name="care_instructions"
                        value={formData.care_instructions}
                        onChange={handleInputChange}
                        placeholder="Entrez les instructions d'entretien"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Localisation</FormLabel>
                    <HStack>
                        <Input
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Entrez la localisation"
                        />
                        <IconButton
                            aria-label="Search location"
                            icon={<i className="fa-solid fa-location-dot"></i>}
                        />
                    </HStack>
                </FormControl>

                <Flex gap={4}>
                    <Button
                        leftIcon={<i className="fa-solid fa-plus"></i>}
                        bg="#337418"
                        colorScheme="green"
                        onClick={handleAdd}
                    >
                        Ajouter une photo
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </Flex>

                <HStack spacing={4} overflowX="auto" pt={2} sx={{
                    "&::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#888",
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                        borderRadius: "4px",
                    },
                }}>
                    {previewUrls.map((url, index) => (
                        <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            minW="120px"
                        >
                            <Image src={url} alt={`Plant ${index + 1}`} />
                        </Box>
                    ))}
                </HStack>
            </VStack>
        </GenericModal>
    );
};

export default AddModal;