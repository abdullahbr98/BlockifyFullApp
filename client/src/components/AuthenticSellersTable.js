// Description : Displays a table that consists of a List of Authenticated Sellers !
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { useToast } from "@chakra-ui/react";
export default function AuthenticSellerTable() {
    const [authenticSellers, setauthenticSellers] = useState([]);
    const toast = useToast();
    const removeSellerHandler = async (sellerAddress) => {
        console.log("clicked in remove:", sellerAddress);
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        console.log("manAddress:", items[0]);
        const data = await axios.post(
            "http://localhost:8000/ManufacturerSM/remove_seller",
            {
                sellerAddress: sellerAddress,
                accountAddress: items[0],
            }
        );
        toast({
            title: "Seller Removed.",
            description: "We've removed the seller for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };
    useEffect(() => {
        setauthenticSellers(
            JSON.parse(localStorage.getItem("authenticatedSeller"))
        );
    }, []);
    console.log(authenticSellers);
    return (
        <Box px={120} h={"80vh"}>
            <Text align="center" fontSize={"2xl"} color="black" my={4}>
                Authentic Sellers List
            </Text>
            <TableContainer>
                <Table variant="striped">
                    <TableCaption>List of Authentic sellers</TableCaption>
                    <Thead>
                        <Tr>
                            <Th isNumeric>Seller Address </Th>
                            <Th isNumeric>Remove from list</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {authenticSellers?.map((authenticSellers) => {
                            return (
                                <Tr>
                                    <Td isNumeric> {authenticSellers} </Td>
                                    <Td>
                                        <Stack
                                            direction="row"
                                            justifyContent="end"
                                        >
                                            <Badge
                                                colorScheme="red"
                                                cursor="pointer"
                                                onClick={() => {
                                                    removeSellerHandler(
                                                        authenticSellers
                                                    );
                                                }}
                                            >
                                                Remove
                                            </Badge>
                                        </Stack>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}
