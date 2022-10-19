import React from "react";
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
export default function SideBarItem({ logo, title,link }) {
    return (
        <Flex
            w="100%"
            mb="4"
            _hover={{ backgroundColor: "blue.400" }}
            borderRadius={12}
            px="2"
            py="3"
            cursor="pointer"
            onClick={(e) => {
                e.preventDefault();
                window.location.href = `/${link}` ;
            }}
        >
            <Box>
                <Icon as={logo} h="20px" w="20px" me="1" />
            </Box>
            <Text fontWeight="bold">{title}</Text>
        </Flex>
    );
}
