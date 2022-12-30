import React from "react";
import {
    Box,
    Button,
    Flex,
    Text,
    Table,
    Thead,
    Badge,
    Tbody,
    Link,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
export default function OrderSection() {
    return (
        <Box mx="50px" my="5">
            <Text fontSize="3xl" fontWeight="medium" py="3">
                Order History
            </Text>
            <Text fontSize="sm" py="3" ps="5">
                Your Order List
            </Text>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>order ID</Th>
                            <Th>Items</Th>
                            <Th>Order Amount</Th>
                            <Th>Order Date</Th>
                            <Th>Payment Method</Th>
                            <Th>Payment Status</Th>
                            <Th>Order Status</Th>
                            <Th>Shipment Details</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>1234</Td>
                            <Td>1</Td>
                            <Td>500$</Td>
                            <Td>14 july 2021</Td>
                            <Td>Stripe</Td>
                            <Td>
                                <Badge colorScheme="green">Paid</Badge>
                            </Td>
                            <Td>
                                <Badge colorScheme="green">Shipped</Badge>
                                <Badge colorScheme="red">Cancelled</Badge>
                                <Badge colorScheme="yellow">In transit</Badge>
                            </Td>
                            <Td>
                                <Link color="blue">Details </Link>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}
