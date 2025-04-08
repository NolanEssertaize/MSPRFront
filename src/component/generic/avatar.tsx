import {
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Icon,
    useToast,
} from "@chakra-ui/react";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useCurrentUserStore from "../../store/CurrentUser.ts";
import {FC, useEffect} from "react";

interface AvatarMenuProps {
    avatarUrl?: string;
    userName?: string;
}

const AvatarMenu: FC<AvatarMenuProps> = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const user = useCurrentUserStore(state => state.user);
    const token = useCurrentUserStore(state => state.token);

    useEffect(() => {
    }, [user, token]);

    const handleLogout = async () => {
        try {

            const token = localStorage.getItem('authToken');

            if (!token) {

                navigate("/login");
                return;
            }

            const response = await fetch('/api/auth/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {

                localStorage.removeItem('authToken');

                toast({
                    title: "Déconnexion réussie",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });


                navigate("/login");
            } else {
                throw new Error('Erreur lors de la déconnexion');
            }
        } catch (error) {
            console.error('Erreur de déconnexion:', error);
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de la déconnexion",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            localStorage.removeItem('authToken');
            navigate("/login");
        }
    };

    const handleSettingClick = () => {
        navigate("/setting");
    };

    return (
        <Menu>
            <MenuButton>
                <Avatar
                    size="md"
                    name={user.username}
                    cursor="pointer"
                />
            </MenuButton>
            <MenuList color="black">
                <MenuItem
                    icon={<Icon as={FiSettings} />}
                    onClick={handleSettingClick}
                    fontWeight="bold"
                >
                    Paramètres
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    icon={<Icon as={FiLogOut} />}
                    onClick={handleLogout}
                    fontWeight="bold"
                >
                    Se déconnecter
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default AvatarMenu;