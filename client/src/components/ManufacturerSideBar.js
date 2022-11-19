import React,{useState,useEffect} from "react";
import axios from "axios";
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
    const [manufacturerUsername, setmanufacturerUsername] = useState("");
    const [manufacturerEmail, setmanufacturerEmail] = useState("");
    const [placement, setPlacement] = React.useState("right");

    const manufacturerData = async () => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        const dataOfManufacturer = await axios.post(
            "http://localhost:8000/Manufacturer/getManufacturerInfo",
            {userAddress:items}
        );
        setmanufacturerUsername(dataOfManufacturer.data.username);
        setmanufacturerEmail(dataOfManufacturer.data.email);
    };

    useEffect(() => {
        manufacturerData();
    }, [])
    
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
                            {manufacturerUsername} <br />
                            <Text fontSize="sm" color="gray">
                                {" "}
                                {manufacturerEmail}
                            </Text>
                        </DrawerHeader>
                        <DrawerBody>
                        <SideBarItem title={"Dashboard"} logo={HiHome} link="Manufacturer/manufacturer"/>
                        <SideBarItem title={"Products Inventory"} logo={AiOutlineShoppingCart} link="ManufacturerProductPage"/>
                        <SideBarItem title={"Verification"} logo={GoVerified} link="pendingVerificationRequests"/>
                        <SideBarItem title={"Sellers"} logo={FaUsers} link="AuthenticSellers"/>
                        {/* <SideBarItem title={"User Profile"} logo={MdManageAccounts}/> */}
                        <SideBarItem title={"Transactions"} logo={AiOutlineTransaction}/>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        </>
    );
}
