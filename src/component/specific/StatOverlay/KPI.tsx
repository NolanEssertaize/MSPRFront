import {Box, Flex} from "@chakra-ui/react";


function KPI () {
    return (
        <Box
            bg="blackAlpha.900"
            borderRadius="lg"
            pt={12}
            color="white"
            w={80}
            h={700}
            position="sticky"
            top="0"
            mr={8}
            mt={12}
            borderColor={'#337418'}
            borderWidth={2}
        >
            <Box position="relative" h={40} w={40} mx="auto">
                <svg viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="gray"
                        strokeWidth="10"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="green.400"
                        strokeWidth="10"
                        strokeDasharray={`${(0/3) * 283} 283`}
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <Flex
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    align="center"
                    justify="center"
                    direction="column"
                    textAlign="center"
                >
                    <Box fontSize="xl" fontWeight="bold">
                        0/3
                    </Box>
                    <Box fontSize="sm">Plant confiées</Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default KPI;