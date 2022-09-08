import React, { useState, useEffect } from "react";
import { CheckCircleIcon} from '@chakra-ui/icons'
import { Text, Box, Flex, Button } from "@chakra-ui/react";
import axios from "axios";
export default function SellerAuthenticationStatus() {
    const [authenticated, setauthenticated] = useState(0);
    const [accountAddress, setaccountAddress] = useState(0);

//requestAuthetication
    const requestAutheticationHandler = async () =>{
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        setaccountAddress(items[0]);
        const data = await axios.post(
            "http://localhost:8000/seller/requestAuthentication", //TODO customize this to seller and buyer
            {
                sellerAddress: items[0]
            }
        );
    }

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
            <Box w="90vw" align="center">
                <Text fontSize="3xl">Seller Authentication Status </Text>
                <Flex justifyContent="center">
                    <Text fontWeight="bold">Account Address:</Text>
                    <Text>{accountAddress}</Text>
                </Flex>

                {/* <Flex justifyContent="center"> */}
                <Text fontWeight="bold">Account Status:</Text>
                {/* <Flex/> */}
                {authenticated ? (
                    <Flex justifyContent="center">
                    <Text me="5">Authenticated</Text>
                    <CheckCircleIcon color="green.300" mt="1"/>
                    </Flex>
                ) : (
                    <Box>
                        <Flex>
                            <Text>Not authenticated</Text>
                        </Flex>
                        <Button onClick={requestAutheticationHandler}>
                            request authentic
                        </Button>
                    </Box>
                )}
            </Box>
        </>
    );
}
