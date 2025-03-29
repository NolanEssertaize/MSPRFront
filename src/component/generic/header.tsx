import {Box, Flex, Input, InputGroup, InputRightElement, Stack, useDisclosure} from "@chakra-ui/react";
import {AddIcon, Search2Icon} from "@chakra-ui/icons";
import GenericButton from "./genericButton.tsx";
import AvatarMenu from "./avatar.tsx";
import img from "../../assets/img.png"
import AddModal from "../specific/addModal.tsx";


function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return(
        <Box
            top="0"
            h="10%"
            ml='15%'
            w='85%'
            bg='black'
            position="fixed"
            p={4}
            color='white'
            display='flex'
            zIndex={1000}
        >
            <Stack w='25%' direction='row' spacing={4} align='center'>
                <InputGroup>
                    <Input placeholder="Rechercher..." size="lg" variant='outline'/>
                    <InputRightElement alignItems='center'>
                        <Search2Icon fontSize={20}/>
                    </InputRightElement>
                </InputGroup>

            </Stack>
            <Flex ml={'auto'} gap={5} align='center'>
                <GenericButton
                    label={'Ajouter'}
                    leftIcon={<AddIcon/>}
                    onClick={onOpen}
                />
                <AvatarMenu avatarUrl={img}/>

            </Flex>
            <AddModal isOpen={isOpen} onClose={onClose}>

            </AddModal>
        </Box>
    )
}

export default Header;