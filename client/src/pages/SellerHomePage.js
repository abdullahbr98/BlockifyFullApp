import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    Box,
    Flex,
    Text,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    useDisclosure,
} from "@chakra-ui/react";
import ManufacturerTable from "../components/ManufacturerTable";
import AuthenticSellersList from "../components/AuthenticSellersList";
import { ArrowBackIcon } from "@chakra-ui/icons";
import DashboardItems from "../components/DashboardItems";
import { ChevronRightIcon } from "@chakra-ui/icons";
export default function SellerHomePage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    return (
        <Box>
            <Box className="App" mx={100} mt={25}>
                <Navbar guestAccess={false} heading={"Seller Home Screen"} />
            </Box>
            <>
                <Button ref={btnRef} color="black" bg="white" onClick={onOpen}>
                    <ChevronRightIcon />
                </Button>
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton mt={2} />
                        <DrawerHeader>Blockify</DrawerHeader>

                        <DrawerBody>
                            <Button colorScheme="teal" variant="ghost" w={"18vw"}>
                                Button
                            </Button>
                        </DrawerBody>

                        <DrawerFooter>
                            {/* <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue">Save</Button> */}
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        </Box>
    );
}
