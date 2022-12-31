import React,{useState,useEffect} from "react";
import { SearchIcon } from "@chakra-ui/icons";
import logo from "../images/BlockifyLogo.png";
import { HiHome } from "react-icons/hi";
import { HiShoppingCart } from "react-icons/hi";
import { MdStore, MdOutlineAccountCircle } from "react-icons/md";
import {
    Box,
    Icon,
    Button,
    Flex,
    Select,
    Image,
    InputGroup,
    InputRightElement,
    Input,
    Link,
    Text,
} from "@chakra-ui/react";
export default function BuyerNavbar() {
    const [username, setusername] = useState("");
    useEffect(() => {
        const usernameBuyer = localStorage.getItem("usernameOfBuyer");
        if(usernameBuyer){
            setusername(usernameBuyer);
        }
    }, [])
    
    return (
        <>
            <Box w="100vw" h="15vh" bg="blue.600" px="50px">
                <Flex justifyContent="right" color="white" pe="4" pt="2">
                    <Link fontSize="sm" href={`/orders/`+localStorage.getItem("usernameOfBuyer")}>
                        Order Status
                    </Link>
                </Flex>
                <Flex justifyContent="space-between" pt="2">
                    <Flex>
                        <Flex>
                            <Box pt="1">
                                <Image
                                    src={logo}
                                    alt="blockify Logo"
                                    height="30px"
                                    width="30px"
                                />
                            </Box>
                            <Text
                                color="white"
                                fontSize="2xl"
                                fontWeight="bold"
                                mx="2"
                            >
                                Blockify
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex pt="2">
                        <Flex mx="2">
                            <Box pt="1">
                                <Icon as={MdStore} color="white"></Icon>
                            </Box>
                            <Link fontWeight="medium" color="white" mx="2">
                                Stores
                            </Link>
                        </Flex>
                        <Flex mx="2">
                            <Box pt="1">
                                <Icon as={HiShoppingCart} color="white"></Icon>
                            </Box>
                            <Link
                                fontWeight="medium"
                                color="white"
                                mx="2"
                                href="/cart"
                            >
                                Cart
                            </Link>
                        </Flex>
                        <Flex mx="2">
                            <Link
                                fontWeight="medium"
                                color="white"
                                mx="2"
                                href="/"
                            >
                                <Button colorScheme="facebook" size="sm">
                                    Log Out
                                </Button>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Box w="100vw" h="6vh" bg="blue.500" px="50px" color="white">
                <Flex>
                    <Button
                        h="6vh"
                        borderRadius={0}
                        bg="blue.500"
                        _hover={{ backgroundColor: "blue.600" }}
                    >
                        <Box pt="1" me="1">
                            <Icon as={HiHome} color="white"></Icon>
                        </Box>
                        <Link href={`/Buyer/`+username}>
                        HOME
                        </Link>
                    </Button>
                    <Box borderWidth="1px" height="6vh" borderColor="blue.600"></Box>
                    <Button
                        h="6vh"
                        borderRadius={0}
                        bg="blue.500"
                        _hover={{ backgroundColor: "blue.600" }}
                    >
                        FAQS
                    </Button>
                    <Box borderWidth="1px" height="6vh" borderColor="blue.600"></Box>
                    <Button
                        h="6vh"
                        borderRadius={0}
                        bg="blue.500"
                        _hover={{ backgroundColor: "blue.600" }}
                    >
                        ABOUT US
                    </Button>
                </Flex>
            </Box>
        </>
    );
}
