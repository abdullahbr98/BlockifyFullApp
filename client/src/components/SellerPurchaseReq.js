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
import axios from "axios";
export default function SellerPurchaseReq() {
    const [purchaseRequests, setPurchaseRequests] = useState([]);
    const purchaseRequestSetter = async () => {
        const result = await axios.get(
            "http://localhost:8000/Seller/purchaseRequest"
        );
        // localStorage.setItem("pendingRequests", JSON.stringify(result.data));
        setPurchaseRequests(result.data);
    };
    const RequestCompleteHandler = ()=>{
        console.log("i am clicked");
    }
    useEffect(() => {
        console.log("useEffect called");
        purchaseRequestSetter();
    }, []);
    return (
        <>
            <Flex  flexDirection="column">
                <Text align="center" fontSize={"2xl"} color="black" my={4}>
                    Pending Product Requests
                </Text>
                <TableContainer>
                    <Table variant="striped">
                        <TableCaption>
                            Manufacturer Product distribution Control Panel
                        </TableCaption>
                        <Thead >
                            <Tr>
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
                                                    onClick={RequestCompleteHandler}
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
