import React, { useState, useEffect } from "react";
import {
    TableContainer,
    Table,
    Flex,
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
} from "@chakra-ui/react";
import TestStripe from "../components/TestStripe";
import axios from "axios";
export default function SellerPurchaseReq() {
    const [purchaseRequests, setPurchaseRequests] = useState([]);
    const purchaseRequestSetter = async () => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        const result = await axios.get(
            "http://localhost:8000/Seller/purchaseRequest",
            {params:{sellerAddress:items}}
        );
        // localStorage.setItem("pendingRequests", JSON.stringify(result.data));
        setPurchaseRequests(result.data);
    };
    const RequestCompleteHandler = (modelNo,products,sellerId)=>{
        localStorage.setItem('modelNo', modelNo);
        localStorage.setItem('noOfProducts', products);
        console.log("i am clicked");
        window.location.href="http://localhost:3000/stripePayment"
    }
    useEffect(() => {
        console.log("useEffect called");
        purchaseRequestSetter();
    }, []);
    return (
        <>
            <Flex  flexDirection="column">
                <Text align="center" fontSize={"2xl"} color="black" my={4}>
                    Pending Purchase Requests
                </Text>
                <TableContainer>
                    <Table variant="striped">
                        <TableCaption>
                            Seller Purcahse Request Page
                        </TableCaption>
                        <Thead >
                            <Tr>
                                <Th isNumeric>Model No </Th>
                                <Th isNumeric>User Address </Th>
                                <Th isNumeric>Manufacturer Address </Th>
                                <Th isNumeric>Product Requested</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {purchaseRequests?.map((purchaseRequest) => {
                                return (
                                    <Tr>
                                        <Td isNumeric>
                                            {purchaseRequest.productModelNo}
                                        </Td>
                                        <Td isNumeric>
                                            {purchaseRequest.seller}
                                        </Td>
                                        <Td isNumeric>
                                            {purchaseRequest.manufacturer}
                                        </Td>
                                        <Td isNumeric>
                                            {purchaseRequest.products}
                                        </Td>
                                        <Td>
                                            <Stack
                                                direction="row"
                                                justifyContent="end"
                                            >
                                                <Badge
                                                    colorScheme="green"
                                                    cursor="pointer"
                                                    onClick={()=>{RequestCompleteHandler(purchaseRequest.productModelNo,purchaseRequest.products,purchaseRequest.seller)}}
                                                >
                                                    Complete
                                                </Badge>
                                            </Stack>
                                        </Td>
                                    </Tr>
                                );
                            })}{" "}
                            {/* //TODO call an api here for data retreival and Map function. */}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </>
    );
}
