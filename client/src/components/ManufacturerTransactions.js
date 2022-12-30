import React, { useEffect, useState } from "react";
import {
    Table,
    Box,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Flex,
    TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ReactSpinner from "../components/ReactSpinner";
import ManufacturerSideBar from "../components/ManufacturerSideBar";
export default function ManufacturerTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setloading] = useState(true);
    const getTransactions = async () => {
        setloading(true);
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        console.log(items);
        const result = await axios.get(
            "http://localhost:8000/Manufacturer/getAllTransactions",
            {
                params: {
                    accountAddress: items,
                },
            }
        );
        setloading(false);
        setTransactions(result.data);
        console.log(result.data);
    };

    useEffect(() => {
        getTransactions();
    }, []);

    return loading ? (
        <>
            <Box mx={100}>
                <Navbar
                    guestAccess={false}
                    heading={"Manufacturer Dashboard"}
                    manufacturerAccess={true}
                />
            </Box>
            <Flex>
                <ManufacturerSideBar />
                <ReactSpinner />
            </Flex>
        </>
    ) : (
        <Box>
            <Box mx={100}>
                <Navbar
                    guestAccess={false}
                    heading={"Manufacturer Dashboard"}
                    manufacturerAccess={true}
                />
            </Box>
            <Flex>
                <ManufacturerSideBar />
                <Box w="50%">
                    <Table variant="striped" colorScheme="blue" size="sm">
                        <Thead>
                            <Tr>
                                <Th>Sender Address</Th>
                                <Th>Reciever Address</Th>
                                <Th>Value(Eth)</Th>
                                <Th>Gas Used</Th>
                                <Th>Gas Price</Th>
                                <Th>Gas Limit</Th>
                                <Th>Time Stamp</Th>
                                <Th>Block Number</Th>
                                <Th>Transaction Hash</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {transactions.map((tx) => {
                                return (
                                    <>
                                        <Tr>
                                            <Td>{tx.from}</Td>
                                            <Td>{tx.to}</Td>
                                            <Td>{tx.value}</Td>
                                            <Td>{tx.gasUsed}</Td>
                                            <Td>{tx.gasPrice}</Td>
                                            <Td>{tx.gasLimit}</Td>
                                            <Td>{tx.timeStamp}</Td>
                                            <Td>{tx.minedInBlock}</Td>
                                            <Td>{tx.tHash}</Td>
                                        </Tr>
                                    </>
                                );
                            })}
                        </Tbody>
                    </Table>
                </Box>
            </Flex>
        </Box>
    );
}
