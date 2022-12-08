import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Link, Image, SimpleGrid } from "@chakra-ui/react";
import Inventory from "../images/Inventory.png"
import verification from "../images/verification.png"
import axios from "axios";
import productRequests from "../images/productRequest.png";
import authenticatedSeller from "../images/authenticatedSeller.png";

export default function DashboardItems({ setProductsFunc }) {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [productListLength, setproductListLength] = useState(0);
    const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
    const [sellerAuthenticList, setsellerAuthenticList] = useState([]);
    const [authenticatedSellerCount, setauthenticatedSellerCount] = useState(0);
    const [authenticationRequest, setAuthenticationRequest] = useState([]);
    const [authenticationRequestCount, setAuthenticationRequestCount] =
        useState(0);
    const authenticationReqestSetter = async () => {
        const data = await axios.get(
            "http://localhost:8000/manufacturer/AuthenticationRequest",
            {
                params:{
                    manufacturerAddress: JSON.parse(
                        localStorage.getItem("UserAddress")
                    )[0]
                }
            }
        );
        setAuthenticationRequest(data.data);
        setAuthenticationRequestCount(data.data.length);
        localStorage.setItem("authenticationRequestList", JSON.stringify(data.data));
        console.log(data.data)
        console.log("length of count:", data.data.length);
    };

    const productListFunction = async () => {
        const listOfProducts = await axios.get(
            "http://localhost:8000/Product/getAllProducts",
            {}
        );
        setproductListLength(listOfProducts.data.length);
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
        localStorage.setItem("authenticSellerListData", JSON.stringify(authenticatedSeller.data));
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
        productListFunction();
    }, [authenticatedSellerCount]);
    return (
        <>
            <Box px={100} h={"80vh"} mt={4}>
                <SimpleGrid columns={2} spacing={5}>
                    <Box
                        color="white"
                        bg="white"
                        p={4}
                        me={4}
                        boxShadow="md"
                        rounded="md"
                        _hover={{ backgroundColor: "gray.100", boxShadow:"dark-lg" }}
                        cursor="pointer"
                    >
                        <Flex justifyContent="space-between">
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
                        rounded="md"
                        _hover={{ backgroundColor: "gray.100", boxShadow:"dark-lg" }}
                        cursor="pointer"
                    >
                        <Flex justifyContent="space-between">
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
                    

                    <Box
                        color="white"
                        bg="white"
                        p={4}
                        me={4}
                        boxShadow="md"
                        rounded="md"
                        _hover={{ backgroundColor: "gray.100", boxShadow:"dark-lg" }}
                        cursor="pointer"
                    >
                        <Flex justifyContent="space-between">
                        <Flex direction="column">
                            <Text
                                fontSize="lg"
                                fontWeight="bold"
                                color="gray.500"
                            >
                                Products in Inventory
                            </Text>
                            <Text
                                fontSize="3xl"
                                fontWeight="bold"
                                color="black"
                            >
                                {productListLength} items
                            </Text>
                        </Flex>
                        <Box>
                        <Image src={Inventory} h="80px" w="80px" />
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
                                <Link href="/ManufacturerProductPage">
                                    View Products
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
                        rounded="md"
                        _hover={{ backgroundColor: "gray.100", boxShadow:"dark-lg" }}
                        cursor="pointer"
                    >
                        <Flex justifyContent="space-between">
                        <Flex direction="column">
                            <Text
                                fontSize="lg"
                                fontWeight="bold"
                                color="gray.500"
                            >
                                Pending Verification Requests
                            </Text>
                            <Text
                                fontSize="3xl"
                                fontWeight="bold"
                                color="black"
                            >
                                {authenticationRequestCount} Requests
                            </Text>
                        </Flex>
                        <Box>
                        <Image src={verification} h="80px" w="80px" />
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
                                <Link href="/pendingVerificationRequests">
                                    View Requests
                                </Link>
                            </Button>
                        </Flex>
                    </Box>
                </SimpleGrid>
                <Flex></Flex>
            </Box>
        </>
    );
}
