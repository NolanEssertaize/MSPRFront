import { Box, Flex, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useCurrentUserStore from "../store/CurrentUser";
// import { fetchUserInfo } from "../api/GetUserInfos";
import {loginUser, registerUser} from "../api/authQuery.ts";
import {LoginForm} from "../component/specific/login/loginForm.tsx";
import {RegisterForm} from "../component/specific/login/registerForm.tsx";

export default function LoginPage() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formRegisterData, setFormRegisterData] = useState({
        email: "",
        password: "",
        is_botanist: false
    });

    const navigate = useNavigate();
    const toast = useToast();
    const setCurrentUser = useCurrentUserStore(state => state.setCurrentUser);

    const handleToggleMode = () => {
        setIsLoginMode(prev => !prev);
        setFormData({ email: "", password: "" });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isLoginMode) {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormRegisterData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const loginCredentials = {
                email: formData.email,
                password: formData.password
            };

            const data = await loginUser(loginCredentials);

            if (data.access_token) {
                localStorage.setItem('token', data.access_token);


                setCurrentUser({
                    email: formData.email,
                    token: data.access_token
                });

                toast({
                    title: "Connexion réussie",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                navigate("/home");
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            toast({
                title: "Erreur de connexion",
                description: error.message || "Une erreur est survenue lors de la connexion",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await registerUser(formRegisterData);
            toast({
                title: "Compte créé avec succès",
                description: "Vous pouvez maintenant vous connecter",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setIsLoginMode(true);
        } catch (error) {
            toast({
                title: "Erreur",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgImage="url(/src/assets/bg.png)"
            bgSize="cover"
            p={2}
            overflow="hidden"
        >
            <Box
                width="800px"
                height="500px"
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(10px)"
                borderRadius="lg"
                boxShadow="lg"
                overflow="hidden"
                position="relative"
            >
                <Flex
                    width="200%"
                    height="100%"
                    transform={isLoginMode ? "translateX(0)" : "translateX(-50%)"}
                    transition="transform 0.5s ease-in-out"
                >
                    <Box
                        width="50%"
                        bg="rgba(0, 0, 0, 0.6)"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        p={8}
                    >
                        <Heading mb={6} color="white">Connexion</Heading>
                        <LoginForm
                            formData={formData}
                            onSubmit={handleLogin}
                            onChange={handleInputChange}
                            isLoading={isLoading}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onToggleMode={handleToggleMode}
                        />
                    </Box>
                    <Box
                        width="50%"
                        bg="rgba(0, 0, 0, 0.6)"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        p={8}
                    >
                        <Heading mb={6} color="white">Créer un compte</Heading>
                        <RegisterForm
                            formData={formRegisterData}
                            onSubmit={handleRegister}
                            onChange={handleInputChange}
                            isLoading={isLoading}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onToggleMode={handleToggleMode}
                        />
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}