import {Box, Flex, Grid} from "@chakra-ui/react";
import CardFeed from "../component/generic/CardFeed.tsx";

function LikePage () {
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

                        // Firefox scrollbar styling
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#888888 #f1f1f1',

                        // Webkit (Chrome, Safari, Edge) scrollbar styling
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

                        // Hide default arrows
                        '&::-webkit-scrollbar-button': {
                            display: 'none',
                        },
                    }}
                >

                    <Grid
                        templateColumns="repeat(4, 1fr)"
                        gap="10"
                        flex="1"
                        maxW="800px"
                        justifyContent="start"
                        ml={'20%'}
                    >
                        {[...Array(11)].map((_, index) => (
                            <CardFeed key={index} />
                        ))}
                    </Grid>
                </Flex>
            </Box>
        </Box>
    )
}

export default LikePage;