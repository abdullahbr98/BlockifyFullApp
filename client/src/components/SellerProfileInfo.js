import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Text,
    Image,
    useToast,
    Badge,
    Flex,
    Button,
    Input,
    Table,
    Thead,
    Tbody,
    Link,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

//getOrderOfSeller

export default function SellerProfileInfo({ profileInfoFunc }) {
    const toast = useToast();
    const [orderArray, setorderArray] = useState([]);
    const orderStatusHelperFunction = (status) => {
        if (status == "placed") {
            return "confirmed";
        } else if (status == "confirmed") {
            return "processed";
        } else if (status == "processed") {
            return "shipped";
        }
        return status;
    };

    const changeOrderStatusApi = async (id, status) => {
        const data = await axios.post(
            "http://localhost:8000/Order/changeOrderStatus",
            {
                orderId: id,
                orderStatus: status,
            }
        );
        toast({
            title: "Order Status Updated.",
            description: "We've Updated Order Status",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    const changeSellerOrderStatus = (status) => {
        if (status == "placed") {
            return "confirm";
        } else if (status == "confirmed") {
            return "process";
        } else if (status == "processed") {
            return "ship";
        }
        return status;
    };
    const sellerOrdersRequest = async () => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        const data = await axios.get(
            "http://localhost:8000/Order/getOrderOfSeller",
            {
                params: {
                    sellerAddress: items,
                },
            }
        );
        console.log();
        console.log(data.data);
        setorderArray(data.data);
    };

    useEffect(() => {
        sellerOrdersRequest();
    }, []);

    return (
        <>
            {profileInfoFunc ? (
                <>
                    <Box align="center" w="90vw">
                        <Flex justifyContent="center">
                            <Text fontSize="2xl">Orders Details</Text>
                        </Flex>
                        <Flex justifyContent="center">
                            <Text fontSize="lg" mt="4">Press the order status button below to updated<br/>the order status shown below</Text>
                        </Flex>
                        <Box mt="10vh" align="center" px={10}>
                            <TableContainer>
                                <Table variant="striped" colorScheme="blue">
                                    <Thead>
                                        <Tr>
                                            <Th>Order ID</Th>
                                            <Th>Order Amount</Th>
                                            <Th>Payment Method</Th>
                                            <Th>Payment Status</Th>
                                            <Th>Order Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {orderArray?.map((orderArray) => {
                                            console.log(orderArray);
                                            return (
                                                <Tr>
                                                    <Td>
                                                        {orderArray.orderId}
                                                    </Td>
                                                    <Td>
                                                        {orderArray.orderAmount}
                                                        $
                                                    </Td>
                                                    <Td>
                                                        {
                                                            orderArray.paymentMethod
                                                        }
                                                    </Td>
                                                    <Td align="center">
                                                        <Flex>
                                                            <Text
                                                                fontWeight="bold"
                                                                color="green"
                                                                align="center"
                                                                ps="40px"
                                                            >
                                                                {
                                                                    orderArray.paymentStatus
                                                                }
                                                            </Text>
                                                        </Flex>
                                                    </Td>
                                                    <Td>
                                                        <Flex>
                                                            <Badge
                                                                cursor="pointer"
                                                                colorScheme="green"
                                                                borderRadius={4}
                                                                borderColor="green.500"
                                                                borderWidth="1px"
                                                                onClick={() => {
                                                                    changeOrderStatusApi(
                                                                        orderArray.orderId,
                                                                        orderStatusHelperFunction(
                                                                            orderArray.orderStatus
                                                                        )
                                                                    );
                                                                }}
                                                            >
                                                                {changeSellerOrderStatus(
                                                                    orderArray.orderStatus
                                                                )}
                                                            </Badge>
                                                            {/* <Badge
                                                                colorScheme="yellow"
                                                                borderRadius={4}
                                                                borderColor="yellow.500"
                                                                borderWidth="1px"
                                                            >
                                                                Processed
                                                            </Badge>
                                                            <Badge
                                                                colorScheme="purple"
                                                                borderRadius={4}
                                                                borderColor="purple.500"
                                                                borderWidth="1px"
                                                            >
                                                                Confirm Shipment
                                                            </Badge> */}
                                                        </Flex>
                                                    </Td>
                                                </Tr>
                                            );
                                        })}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </>
            ) : (
                <Box display="none"></Box>
            )}
        </>
    );
}
