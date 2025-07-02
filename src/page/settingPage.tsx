import {
    Box,
    Button,
    Divider,
    Grid,
    GridItem,
    HStack,
} from "@chakra-ui/react";
import { FaSave } from "react-icons/fa";
import {GeneralSettings} from "../component/specific/settings/generaleSettings.tsx";
import {NotificationSettings} from "../component/specific/settings/notificatioSetting.tsx";
import {SecuritySettings} from "../component/specific/settings/securitySetting.tsx";
import {AccountSettings} from "../component/specific/settings/accountSetting.tsx";
import {UserInfoForm} from "../component/specific/settings/userInfoForm.tsx";

function SettingPage() {

    return (
        <Grid
            templateColumns="17% 40% 40%"
            gap={2}
            height="90%"
            bg={"white"}
            mt={'5%'}

        >
            <GridItem />
            <GridItem>
                <Box
                    w="95%"
                    bg={"white"}
                    borderRadius="lg"
                    p={8}
                >
                    <GeneralSettings/>
                    <Divider />
                    <NotificationSettings />
                    <Divider />
                    <SecuritySettings />
                    <Divider />
                    <AccountSettings />

                    <HStack justify="center" mt={6}>
                        <Button
                            colorScheme="green"
                            leftIcon={<FaSave />}
                            size="lg"
                        >
                            Enregistrer
                        </Button>
                    </HStack>
                </Box>
            </GridItem>

            <GridItem p={6}>
                <Box
                    w="95%"
                    bg={"white"}
                    p={6}
                >
                    <UserInfoForm />
                </Box>
            </GridItem>
        </Grid>
    );
}

export default SettingPage;