import React, { useState, useEffect } from "react";
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
export default function AuthenticSellerTable() {
    const [authenticSellers, setauthenticSellers] = useState([]);
    useEffect(() => {
        setauthenticSellers(
            JSON.parse(localStorage.getItem("authenticatedSeller")),
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
