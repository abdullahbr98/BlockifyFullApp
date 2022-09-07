import React from "react";
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
    Text
} from "@chakra-ui/react";
import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
export default function ManufacturerTable() {
    const [pendingRequests,setPendingRequests] = useState([])

    const pendingRequestSetter = async()=>{
        const result = await axios.get(
            "http://localhost:8000/Seller/productRequest"
        );
        // localStorage.setItem("pendingRequests", JSON.stringify(result.data));
        setPendingRequests(result.data);
    }

    const deleteRequestsHandler = async (sellerAddress,products) =>{
        const manAddress = (JSON.parse(localStorage.getItem("UserAddress")));
        const data = await axios.post(
            "http://localhost:8000/manufacturer/deletePurchaseRequest", //TODO customize this to seller and buyer
            { 
                sellerAddress: sellerAddress,
                manufacturerAddress: manAddress[0],
                products: products,
            }
        );
        pendingRequestSetter();
    }

    const pendingRequestsHandler = async (sellerAddress,products)=>{
        const manAddress = (JSON.parse(localStorage.getItem("UserAddress")));
        const data = await axios.post(
            "http://localhost:8000/manufacturer/purchaseRequest", //TODO customize this to seller and buyer
            { 
                sellerAddress: sellerAddress,
                manufacturerAddress: manAddress[0],
                products: products,
            }
        );
        pendingRequestSetter();
    }
    useEffect(()=>{
        // setPendingRequests(JSON.parse(localStorage.getItem('pendingRequests')));
        console.log("useEffect called");
        pendingRequestSetter();
    },[])
    //pendingRequestSetter was called in useEffect
    return (
        <>
            <Text align="center" fontSize={"2xl"} color="black" my={4}>Pending Product Requests</Text>
            <TableContainer>
                <Table variant="striped" >
                    <TableCaption>
                        Manufacturer Product distribution Control Panel
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th isNumeric>User Address </Th>
                            <Th isNumeric>Product Requested</Th>
                            <Th isNumeric>Approve or deny</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {pendingRequests?.map((pendingRequest)=>{
                            return (
                                <Tr>
                            <Td isNumeric>{pendingRequest.sellerAddress}</Td>
                            <Td isNumeric>{pendingRequest.products}</Td>
                            <Td>
                                <Stack direction="row" justifyContent="end">
                                    <Badge colorScheme="green" cursor="pointer" onClick={()=>{pendingRequestsHandler(pendingRequest.sellerAddress,pendingRequest.products)}}>
                                        Accept
                                    </Badge>
                                    <Badge colorScheme="red" cursor="pointer" onClick={()=>{deleteRequestsHandler(pendingRequest.sellerAddress,pendingRequest.products)}}>
                                        Remove
                                    </Badge>
                                </Stack>
                            </Td>
                        </Tr>
                            )
                        })}                        {/* //TODO call an api here for data retreival and Map function. */}
        
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
