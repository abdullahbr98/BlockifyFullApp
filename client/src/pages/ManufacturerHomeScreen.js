import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
export default function ManufacturerHomeScreen() {
    const { id } = useParams();
    return (
        <Box>
            <Box className="App" mx={100} mt={25} >
                <Navbar guestAccess={false}/>
            </Box>
            {/* TO DO bg="blackAlpha.50" */}


            <Box px={120} h={"80vh"}>

            <Flex justifyContent="space-between">
                    <Box
                        opacity="0.8"
                        color="white"
                        bg="green.300"
                        w={"40vw"}
                        h={"35vh"}
                        pt={3}
                        borderRadius={14}
                    >
                        <Text fontSize="3xl" align="center">Pending Product Requests</Text>
                        <Flex justifyContent="space-between">
                            <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>4</Text>
                            <Button color="black" borderColor="black" bg="white" borderRadius={18} variant="outline" fontSize="sm" mt={"12vh"} me={5}>
                                Approve Requests
                            </Button>
                        </Flex>
                    </Box>
                    <Box
                        opacity="0.8"
                        color="white"
                        bg="purple.300"
                        w={"40vw"}
                        h={"35vh"}
                        pt={3}
                        borderRadius={14}
                    >
                        <Text fontSize="3xl" align="center">Total Authenticated Sellers</Text>
                        <Flex justifyContent="space-between">
                            <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>10</Text>
                            <Button color="black" borderColor="black" bg="white" borderRadius={18} variant="outline" fontSize="sm" mt={"12vh"} me={5}>
                                View Sellers List
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
                <Flex>
                <Box
                        mt={5}
                        opacity="0.8"
                        color="white"
                        bg="purple.300"
                        w={"25vw"}
                        h={"35vh"}
                        pt={3}
                        borderRadius={14}
                    >
                        <Text fontSize="2xl" align="center">Products in inventory</Text>
                        <Flex justifyContent="space-between">
                            <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>10</Text>
                            <Button color="black" borderColor="black" bg="white" borderRadius={18} variant="outline" fontSize="sm" mt={"12vh"} me={5}>
                                View Products
                            </Button>
                        </Flex>
                    </Box>
                    <Box
                        ms= {"3vw"}
                        mt={5}
                        opacity="0.8"
                        color="white"
                        bg="red.300"
                        w={"25vw"}
                        h={"35vh"}
                        pt={3}
                        borderRadius={14}
                    >
                        <Text fontSize="2xl" align="center">Total Authenticated Sellers</Text>
                        <Flex justifyContent="space-between">
                            <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>10</Text>
                            <Button color="black" borderColor="black" bg="white" borderRadius={18} variant="outline" fontSize="sm" mt={"12vh"} me={5}>
                                View Sellers List
                            </Button>
                        </Flex>
                    </Box>
                    <Box
                        ms= {"3vw"}
                        mt={5}
                        opacity="0.8"
                        color="white"
                        bg="black"
                        w={"25vw"}
                        h={"35vh"}
                        pt={3}
                        borderRadius={14}
                    >
                        <Text fontSize="2xl" align="center">Total Authenticated Sellers</Text>
                        <Flex justifyContent="space-between">
                            <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>10</Text>
                            <Button color="black" borderColor="black" bg="white" borderRadius={18} variant="outline" fontSize="sm" mt={"12vh"} me={5}>
                                View Sellers List
                            </Button>
                        </Flex>
                    </Box>
                </Flex>

                </Box>

        </Box>
    );
}
