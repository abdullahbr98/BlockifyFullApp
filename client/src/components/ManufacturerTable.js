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
import { useState } from "react";
import { useEffect } from "react";
export default function ManufacturerTable() {
    const [pendingRequests,setPendingRequests] = useState([])
    const foo = (p1,p2)=>{
        console.log(p1,p2);
    }
    useEffect(()=>{
        setPendingRequests(JSON.parse(localStorage.getItem('pendingRequests')));
    },[])
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
                                    <Badge colorScheme="green" cursor="pointer" onClick={()=>{foo(pendingRequest.sellerAddress,pendingRequest.products)}}>
                                        Accept
                                    </Badge>
                                    <Badge colorScheme="red" cursor="pointer">
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
