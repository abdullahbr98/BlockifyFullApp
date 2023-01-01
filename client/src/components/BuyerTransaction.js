import React, { useEffect, useState } from "react";
import {
    Table,
    Box,
    Thead,
    Tbody,
    Tfoot,
    Text,
    Tr,
    Th,
    Td,
    TableCaption,
    Flex,
    TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import ReactSpinner from "../components/ReactSpinner";
import ManufacturerSideBar from "../components/ManufacturerSideBar";
export default function BuyerTransaction() {
    const { seller } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [loading, setloading] = useState(true);
    const getTransactions = async () => {
        setloading(true);
        const result = await axios.get(
            "http://localhost:8000/Manufacturer/getSingleTransaction",
            {
                params: {
                    accountAddress: seller,
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
            <Flex>
                <ReactSpinner />
            </Flex>
        </>
    ) : (
        <Box w="75%">
            <Flex>
                <Box >
                    {transactions.map((tx) => {
                        return (
                            <>
                                <Box>
                                    <Flex>
                                        <Text fontWeight="bold">From:</Text>
                                        <Text> {tx.from}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontWeight="bold">To:</Text>
                                        <Text> {tx.to}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontWeight="bold">Value:</Text>{" "}
                                        <Text>{tx.value}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontWeight="bold">Gas Used:</Text>
                                        <Text>{tx.gasUsed}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontWeight="bold">
                                            Gas Price:
                                        </Text>
                                        <Text>{tx.gasPrice}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontWeight="bold">
                                            Gas Limit:
                                        </Text>
                                        <Text>{tx.gasLimit}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontWeight="bold">
                                            TimeStamp:
                                        </Text>
                                        <Text>{tx.timeStamp}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontWeight="bold">
                                            Mined Block:
                                        </Text>
                                        <Text>{tx.minedInBlock}</Text>
                                    </Flex>
                                    <Box>
                                        <Text fontWeight="bold">
                                            HashValue:
                                        </Text>
                                        <Text>{tx.tHash}</Text>
                                    </Box>
                                </Box>
                            </>
                        );
                    })}
                </Box>
            </Flex>
        </Box>
    );
}
