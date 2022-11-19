import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import {
    TableContainer,
    Table,
    Th,
    Tfoot,
    Td,
    Tr,
    Thead,
    Tbody,
    TableCaption,
    Badge,
    Stack,
    Text,
    Box,
} from "@chakra-ui/react";
export default function PendingAuthenticSellersList() {
    const [authenticationRequest, setAuthenticationRequest] = useState([]);
    const toast = useToast();
    const authenticationReqestHandler = async (sellerAddress) => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        const data = await axios.post(
            "http://localhost:8000/ManufacturerSM/authenticate_seller",
            {
                sellerAddress: sellerAddress,
                accountAddress: items[0],
            }
        );
        toast({
            title: "Seller Authenticated.",
            description: "Seller Successfully Authenticated.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        authenticationReqestSetter();
    };

    const authenticationReqestSetter = async () => {
        const data = await axios.get(
            "http://localhost:8000/manufacturer/AuthenticationRequest"
        );
        setAuthenticationRequest(data.data);
    };
    useEffect(() => {
        authenticationReqestSetter();
    }, []);
    //authenticationReqestHandler
    return (
        <>
            <Text align="center" fontSize={"2xl"} color="black" my={4}>
                Pending Verification Requests
            </Text>
            <TableContainer>
                <Table variant="striped">
                    <TableCaption>
                        Seller Pending Authentication List
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th isNumeric>User Address </Th>
                            <Th isNumeric>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {authenticationRequest?.map((authenticationRequest) => {
                            return (
                                <Tr>
                                    <Td isNumeric>
                                        {authenticationRequest.sellerAddress}
                                    </Td>
                                    <Td>
                                        <Stack
                                            direction="row"
                                            justifyContent="end"
                                        >
                                            <Badge
                                                colorScheme="green"
                                                cursor="pointer"
                                                onClick={() => {
                                                    authenticationReqestHandler(
                                                        authenticationRequest.sellerAddress
                                                    );
                                                }}
                                            >
                                                Authenticate
                                            </Badge>
                                        </Stack>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
