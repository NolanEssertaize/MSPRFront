
import {
    Box,
    VStack,
    Button,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';


function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { id: 'home', label: 'Home', icon: 'fa-solid fa-home', href: '/home' },
        { id: 'plantsitting', label: 'Plantsitting', icon: 'fa-solid fa-seedling', href: '/plantsitting' },
        { id: 'setting', label: 'Settings', icon: 'fa-solid fa-gear', href: '/setting' }
    ];

    const isActive = (href) => {
        return location.pathname === href;
    };

    return (
        <Box
            position="fixed"
            left="0"
            top="0"
            as="nav"
            w={{ base: "25%", md: "20%", lg: "15%" }}
            h="100vh"
            bg="black"
            color="white"
            p="5"
            zIndex={1000}
        >
            <Box mb={6} textAlign="center">
                <svg width="200" height="100" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M93 6.59351C93 6.59351 172.119 64.8584 172.119 101.274C172.119 123.123 142.45 130.406 93 130.406C43.5504 130.406 13.8806 123.123 13.8806 101.274C13.8806 64.8584 93 6.59351 93 6.59351Z" fill="#4AA5D5"/>
                    <path d="M86.0596 23.7368C86.0596 23.7368 141.86 64.8368 141.86 92.2368C141.86 109.362 118.61 112.787 86.0596 112.787C53.5096 112.787 30.2596 109.362 30.2596 92.2368C30.2596 64.8368 86.0596 23.7368 86.0596 23.7368Z" fill="#2E8B57"/>
                    <path d="M81.4097 112.787H90.7097L86.0597 126.487L81.4097 112.787Z" fill="#2E8B57"/>
                    <path opacity="0.3" d="M48.8597 51.9926C48.8597 51.9926 58.1597 38.2926 72.1097 45.1426C86.0597 51.9926 76.7597 65.6926 62.8097 58.8426C48.8597 51.9926 48.8597 51.9926 48.8597 51.9926Z" fill="white"/>
                </svg>
            </Box>

            <VStack spacing="4" align="stretch">
                {menuItems.map((item) => (
                    <Button
                        key={item.id}
                        padding={8}
                        as="a"
                        href={item.href}
                        variant="ghost"
                        color={isActive(item.href) ? "#5DD62C" : 'white'}
                        leftIcon={<i className={item.icon}></i>}
                        justifyContent="flex-start"
                        fontSize="2xl"
                        w="100%"
                        _hover={{
                            color: "#5DD62C",
                            transform: "scale(1.05)",
                        }}
                        sx={{
                            '&[data-active]': {
                                color: "#5DD62C !important",
                            }
                        }}
                    >
                        {item.label}
                    </Button>
                ))}
            </VStack>
        </Box>
    );
}

export default Sidebar;