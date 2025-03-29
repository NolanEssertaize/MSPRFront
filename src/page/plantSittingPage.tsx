import { Box, Grid, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardFeed from "../component/generic/CardFeed.tsx";

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

function PlantsittingPage() {
    const [plants, setPlants] = useState<Plant[]>([]);
    const toast = useToast();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                // Vérifier si l'API attend une autre méthode que GET
                const response = await fetch('http://localhost:8000/care-requests/', {
                    method: 'GET', // Essayer explicitement avec GET
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                });

                if (response.status === 405) {
                    // Si 405, essayer avec POST (parfois les APIs sont conçues pour recevoir un body vide en POST)
                    const postResponse = await fetch('http://localhost:8000/care-requests/', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({}) // Corps vide
                    });

                    if (!postResponse.ok) {
                        throw new Error(`Failed with status: ${postResponse.status}`);
                    }

                    const data = await postResponse.json();
                    setPlants(data);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Failed with status: ${response.status}`);
                }

                const data = await response.json();
                setPlants(data);
            } catch (error) {
                console.error("API Error:", error);
                toast({
                    title: 'Error fetching plants for plantsitting',
                    description: error instanceof Error ? error.message : 'Unknown error occurred',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchPlants();
    }, [toast]);

    return (
        <Box
            w="100vw"
            h="100vh"
            bgImage="url(/src/assets/bg.png)"
            bgSize="cover"
            bgAttachment="fixed"
        >
            <Box backdropFilter="blur(10px)" h="100%">
                <Flex
                    gap="6"
                    pt={24}
                    overflowY="scroll"
                    h="100%"
                    sx={{
                        overflow: 'auto',
                        position: 'relative',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#888888 #f1f1f1',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#888888',
                            borderRadius: '4px',
                            '&:hover': {
                                background: '#555555',
                            },
                        },
                        '&::-webkit-scrollbar-button': {
                            display: 'none',
                        },
                    }}
                >
                    <Grid
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            lg: "repeat(4, 1fr)"
                        }}
                        gap="10"
                        flex="1"
                        maxW="1000px"
                        mx="auto"
                    >
                        {plants.length > 0 ? (
                            plants.map((plant) => (
                                <CardFeed key={plant.id} plant={plant} />
                            ))
                        ) : (
                            <Box gridColumn="span 4" textAlign="center" p={10} color="gray.500">
                                Aucune plante disponible pour le gardiennage
                            </Box>
                        )}
                    </Grid>
                </Flex>
            </Box>
        </Box>
    );
}

export default PlantsittingPage;