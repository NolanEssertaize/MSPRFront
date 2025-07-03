import { Box, Grid, Flex, useToast } from "@chakra-ui/react";
import CardCurrentUser from "../component/generic/CardCurrentUser.tsx";
import { useEffect, useState } from "react";
import KPI from "../component/specific/StatOverlay/KPI.tsx";
import {useNavigate} from "react-router-dom";

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

const HomePage = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await fetch('http://localhost:8000/my_plants/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.status === 401) {
                    toast({
                        title: "Session expirée",
                        description: "Veuillez vous reconnecter.",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                    });
                    navigate("/login");
                    return;
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch plants');
                }

                const data = await response.json();
                setPlants(data);


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
                    pt={'150px'}
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
                        templateColumns="repeat(3, 1fr)"
                        gap="10"
                        flex="1"
                        maxW="800px"
                        mx="auto"
                    >
                        {plants.map((plant) => (
                            <CardCurrentUser key={'plant.id'} plant={plant} />
                        ))}
                    </Grid>
                    <KPI/>
                </Flex>
            </Box>
        </Box>
    );
};

export default HomePage;