import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Link, Image } from "@chakra-ui/react";
import axios from "axios";
import productRequests from "../images/productRequest.png";
import authenticatedSeller from "../images/authenticatedSeller.png";

export default function DashboardItems({ setProductsFunc }) {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
    const [sellerAuthenticList, setsellerAuthenticList] = useState([]);
    const [authenticatedSellerCount, setauthenticatedSellerCount] = useState(0);
    const [authenticationRequest, setAuthenticationRequest] = useState([]);
    const [authenticationRequestCount, setAuthenticationRequestCount] =
        useState(0);
    const authenticationReqestSetter = async () => {
        const data = await axios.get(
            "http://localhost:8000/manufacturer/AuthenticationRequest"
        );
        setAuthenticationRequest(data.data);
        setAuthenticationRequestCount(data.data.length);
        console.log("length of count:", data.data.length);
    };

    const getPendingRequests = async () => {
        const result = await axios.get(
            "http://localhost:8000/Seller/productRequest"
        );
        const authenticatedSeller = await axios.get(
            "http://localhost:8000/ManufacturerSM/getAuthenticatedSellers",
            {
                params: {
                    accountAddress: JSON.parse(
                        localStorage.getItem("UserAddress")
                    )[0],
                },
            }
        );
        setsellerAuthenticList(authenticatedSeller.data);
        setauthenticatedSellerCount(authenticatedSeller.data.length);
        console.log("length of auth seller: ", authenticatedSeller.data.length);
        const data = result.data;
        const count = data.length;
        setPendingRequests(data);
        setPendingRequestsCount(data.length);
        localStorage.setItem("pendingRequests", JSON.stringify(data));
        localStorage.setItem(
            "authenticatedSeller",
            JSON.stringify(authenticatedSeller.data)
        );
    };
    useEffect(() => {
        getPendingRequests();
        authenticationReqestSetter();
    }, [authenticatedSellerCount]);
    return (
        <>
            <Box px={120} h={"80vh"} mt={4}>
                <Flex>
                    <Box
                        color="white"
                        bg="white"
                        p={4}
                        me={4}
                        boxShadow="md"
                        _hover={{ backgroundColor: "gray.100" }}
                        cursor="pointer"
                    >
                        <Flex>
                            <Box>
                                <Text
                                    fontSize="lg"
                                    color="gray.500"
                                    fontWeight="bold"
                                >
                                    Pending Product Requests
                                </Text>

                                <Text
                                    fontSize="3xl"
                                    color="black"
                                    fontWeight="bold"
                                >
                                    {pendingRequestsCount} Products
                                </Text>
                            </Box>
                            <Box>
                                <Image
                                    src={productRequests}
                                    h="80px"
                                    w="80px"
                                />
                            </Box>
                        </Flex>
                        <Flex justifyContent="left">
                            <Button
                                color="black"
                                borderColor="black"
                                bg="white"
                                borderRadius={18}
                                variant="outline"
                                fontSize="sm"
                                mt={"5vh"}
                                me={5}
                                _hover={{
                                    backgroundColor: "black",
                                    color: "white",
                                }}
                            >
                                <Link href="/pendingRequests">
                                    Approve Requests
                                </Link>
                            </Button>
                        </Flex>
                    </Box>

                    <Box
                        color="white"
                        bg="white"
                        p={4}
                        me={4}
                        boxShadow="md"
                        _hover={{ backgroundColor: "gray.100" }}
                        cursor="pointer"
                    >
                        <Flex >
                        <Flex direction="column">
                            <Text
                                fontSize="lg"
                                fontWeight="bold"
                                color="gray.500"
                            >
                                Total Authenticated Sellers
                            </Text>
                            <Text
                                fontSize="3xl"
                                fontWeight="bold"
                                color="black"
                            >
                                {authenticatedSellerCount} Sellers
                            </Text>
                        </Flex>
                        <Box>
                        <Image src={authenticatedSeller} h="80px" w="80px" />
                        </Box>
                        </Flex>
                        <Flex align="left">
                            <Button
                                color="black"
                                borderColor="black"
                                bg="white"
                                borderRadius={18}
                                variant="outline"
                                fontSize="sm"
                                mt={"5vh"}
                                _hover={{
                                    backgroundColor: "black",
                                    color: "white",
                                }}
                            >
                                <Link href="/AuthenticSellers">
                                    View Sellers List
                                </Link>
                            </Button>
                        </Flex>
                    </Box>
                    {/* 
                    <Box
                        opacity="0.8"
                        color="white"
                        bg="blue.400"
                        w={"20vw"}
                        pt={3}
                        borderRadius={14}
                    >
                        <Text fontSize="2xl" align="center">
                            Products in inventory
                        </Text>
                        <Flex justifyContent="space-between">
                            <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>
                                10
                            </Text>
                            <Button
                                color="black"
                                borderColor="black"
                                bg="white"
                                borderRadius={18}
                                variant="outline"
                                fontSize="sm"
                                mt={"12vh"}
                                me={5}
                            >
                                View Products
                            </Button>
                        </Flex>
                    </Box>
                    
                    <Box
                        opacity="0.8"
                        color="white"
                        bg="black"
                        w={"25vw"}
                        pt={3}
                        borderRadius={14}
                    >
                        <Text fontSize="2xl" align="center">
                            Pending Verification Requests
                        </Text>
                        <Flex justifyContent="space-between">
                            <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>
                                {authenticationRequestCount}
                            </Text>
                            <Button
                                color="black"
                                borderColor="black"
                                bg="white"
                                borderRadius={18}
                                variant="outline"
                                fontSize="sm"
                                mt={"12vh"}
                                me={5}
                            >
                                <Link href="/pendingVerificationRequests">
                                    View Requests
                                </Link>
                            </Button>
                        </Flex>
                    </Box> */}
                </Flex>
                <Flex></Flex>
            </Box>
        </>
    );
}
