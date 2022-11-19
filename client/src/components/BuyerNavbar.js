import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import logo from "../images/BlockifyLogo.png";
import { HiShoppingCart } from "react-icons/hi";
import { MdStore, MdOutlineAccountCircle } from "react-icons/md";
import {
    Box,
    Icon,
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
    return (
        <>
            <Box w="100vw" h="15vh" bg="blue.600" px="50px">
                <Flex justifyContent="right" color="white" pe="4" pt="2">
                    <Link fontSize="sm">Order Status</Link>
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
                        <Box ms="3">
                            <InputGroup>
                                <InputRightElement
                                    pointerEvents="none"
                                    children={<SearchIcon color="blue.400" />}
                                />
                                <Input
                                    type="text"
                                    placeholder="Search Blockify"
                                    bg="white"
                                    w="30vw"
                                    borderRadius="2px"
                                />
                            </InputGroup>
                        </Box>
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
                                <Icon
                                    as={MdOutlineAccountCircle}
                                    color="white"
                                ></Icon>
                            </Box>

                            <Link fontWeight="medium" color="white" mx="2">
                                Account
                            </Link>
                        </Flex>
                        <Flex mx="2">
                            <Box pt="1">
                                <Icon as={HiShoppingCart} color="white"></Icon>
                            </Box>
                            <Link fontWeight="medium" color="white" mx="2">
                                Cart
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Box w="100vw" h="5vh" bg="blue.500" px="50px">
                {/* <Flex w="7vw">
                    <Select placeholder="Brand" variant="unstyled">
                        <option value="LG">LG TV</option>
                    </Select>
                </Flex> */}
            </Box>
        </>
    );
}
