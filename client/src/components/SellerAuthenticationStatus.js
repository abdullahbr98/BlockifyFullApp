import React, { useState, useEffect } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { Text, Box, Flex, Button } from "@chakra-ui/react";
import axios from "axios";
export default function SellerAuthenticationStatus() {
    const [authenticated, setauthenticated] = useState(0);
    const [accountAddress, setaccountAddress] = useState(0);
    const toast = useToast();
    //requestAuthetication
    const requestAutheticationHandler = async () => {
        toast({
            title: "Request Sent.",
            description: "We've send you Request To Manufacturer.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        setaccountAddress(items[0]);
        const data = await axios.post(
            "http://localhost:8000/seller/requestAuthentication", //TODO customize this to seller and buyer
            {
                sellerAddress: items[0],
            }
        );
    };

    const authenticHandler = async () => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        setaccountAddress(items[0]);
        const data = await axios.get(
            "http://localhost:8000/seller/getIsAuthenticated", //TODO customize this to seller and buyer
            {
                params: { sellerAddress: items[0] },
            }
        );
        console.log(data.data);
        setauthenticated(data.data);
    };
    useEffect(() => {
        authenticHandler();
    }, []);
    return (
        <>
            <Flex w="90vw" justifyContent="center" alignItems="center">
                <Box
                    align="center"
                    pt="10vh"
                    borderWidth="1px"
                    px={12}
                    boxShadow="xl"
                    p="6"
                    rounded="md"
                    bg="white"
                    h="60vh"
                    w="60vw"
                    bg="blackAlpha.30"
                >
                    <Text fontSize="3xl">Seller Authentication Status </Text>
                    <Flex justifyContent="center" mt="5vh">
                        <Text fontWeight="bold" me="2vw">
                            Account Name:
                        </Text>
                        <Text>seller</Text>
                    </Flex>
                    <Flex justifyContent="center" mt="5vh">
                        <Text fontWeight="bold" me="2vw">
                            Account Address:
                        </Text>
                        <Text>{accountAddress}</Text>
                    </Flex>
                    {authenticated ? (
                        <Box>
                            <Flex justifyContent="center" mt="5vh">
                                <Text fontWeight="bold" me="2vw">
                                    Account Status:
                                </Text>
                                <Text me="5">Authenticated</Text>
                                <CheckCircleIcon color="green.300" mt="1" />
                            </Flex>
                            <Flex justifyContent="center" mt="5vh">
                                <Text fontWeight="bold" me="2vw">
                                    Verification Date:
                                </Text>
                                <Text me="5">
                                    {Date(Date.now()).toString()}
                                </Text>
                            </Flex>
                        </Box>
                    ) : (
                        <Box>
                            <Flex justifyContent="center">
                                <Text fontWeight="bold" me="2vw">
                                    Account Status:
                                </Text>
                                <Text>Not authenticated</Text>
                            </Flex>
                            <Button onClick={requestAutheticationHandler}>
                                request authentic
                            </Button>
                        </Box>
                    )}
                </Box>
            </Flex>
        </>
    );
}
