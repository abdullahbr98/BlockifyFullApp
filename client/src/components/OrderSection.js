import React, { useState, useEffect } from "react";
import axios from "axios";
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
    const [ordersList, setordersList] = useState([]);
    const getBuyerOrdersFromApi = async () => {
        const result = await axios.get(
            "http://localhost:8000/Order/getOrderOfBuyer", //TODO customize this to seller and buyer
            {
                params: {
                    buyerAddress: JSON.parse(
                        localStorage.getItem("UserAddress")
                    ),
                },
            }
        );
        setordersList(result.data);
        console.log("value of orders List: ", result.data);
    };

    useEffect(() => {
        getBuyerOrdersFromApi();
    }, []);

    return (
        <Box mx="50px" my="5" pb="16vh">
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
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ordersList?.map((ordersList,index) => {
                            return (
                                <Tr>
                                    <Td>{index+1}</Td>
                                    <Td>{ordersList.orderId}</Td>
                                    <Td>{ordersList.items}</Td>
                                    <Td>{ordersList.orderAmount}$</Td>
                                    <Td>{ordersList.orderDate}</Td>
                                    <Td>{ordersList.paymentMethod}</Td>
                                    <Td>
                                        <Badge colorScheme="green" ms="8">{ordersList.paymentStatus}</Badge>
                                    </Td>
                                    <Td>
                                        <Badge colorScheme="purple" ms="5">
                                        {ordersList.orderStatus}
                                        </Badge>
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
