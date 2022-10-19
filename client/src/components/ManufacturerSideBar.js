import React from "react";
import SideBarItem from "../components/SideBarItem"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { MdManageAccounts } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import {
    IconButton,
    Icon,
    Box,
    Flex,
    Stack,
    Radio,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
    useDisclosure,
    Drawer,
    DrawerHeader,
    Button,
    RadioGroup,
    Text,
} from "@chakra-ui/react";
import { HiHome } from "react-icons/hi";
import { ArrowRightIcon } from "@chakra-ui/icons";
export default function ManufacturerSideBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [placement, setPlacement] = React.useState("right");
    return (
        <>
            <Box w="7vw">
                <Flex direction="column">
                    <IconButton
                        aria-label="Search database"
                        icon={<ArrowRightIcon h="15px" w="15px" />}
                        bg="white"
                        h="7vh"
                        onClick={onOpen}
                    />
                </Flex>
                <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px">
                            Username Here <br />
                            <Text fontSize="sm" color="gray">
                                {" "}
                                emailhere@gmail.com
                            </Text>
                        </DrawerHeader>
                        <DrawerBody>
                        <SideBarItem title={"Dashboard"} logo={HiHome} link="Manufacturer/manufacturer"/>
                        <SideBarItem title={"Products Inventory"} logo={AiOutlineShoppingCart} link="ManufacturerProductPage"/>
                        <SideBarItem title={"Verification"} logo={GoVerified} link="pendingVerificationRequests"/>
                        <SideBarItem title={"Sellers"} logo={FaUsers} link="AuthenticSellers"/>
                        <SideBarItem title={"User Profile"} logo={MdManageAccounts}/>
                        <SideBarItem title={"Transactions"} logo={AiOutlineTransaction}/>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        </>
    );
}
