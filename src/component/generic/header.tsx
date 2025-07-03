import {Box, Flex,useDisclosure} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import GenericButton from "./genericButton.tsx";
import AvatarMenu from "./avatar.tsx";
import AddModal from "../specific/addModal.tsx";


function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return(
        <Box
            top="0"
            h="100"
            mr='0'
            w='100%'
            bg='black'
            position="absolute"
            p={4}
            color='white'
            display='flex'
            zIndex={999}
        >
            <Flex ml={'auto'} gap={5} align='center'>
                <GenericButton
                    label={'Ajouter'}
                    leftIcon={<AddIcon/>}
                    onClick={onOpen}
                />
                <AvatarMenu/>
            </Flex>
            <AddModal isOpen={isOpen} onClose={onClose}/>
        </Box>
    )
}

export default Header;