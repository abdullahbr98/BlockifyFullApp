import React, { useState } from "react";
import { Box, Flex, Text, Icon, Image } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaBox } from "react-icons/fa";
import { FcShipped } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
export default function ShipmentDetails() {
    const [receiveTime, setreceiveTime] = useState("11:20");
    const [receiveDate, setreceiveDate] = useState("Nov 16");
    const [processLocation, setprocessLocation] = useState("Pakistan");
    const [arrivalDate, setarrivalDate] = useState("Nov 18 - Nov 22");
    //sentinel values to manage the dates
    const [shipped, setshipped] = useState(false);
    const [arrived, setarrived] = useState(false);
    return (
        <>
            <Box
                ps="4"
                w="40%"
                bg="blackAlpha.100"
                mt="1"
                borderRadius="4"
                py="3"
            >
                <Flex>
                    <Flex direction="column" me="5">
                        <Text fontSize="2xl">{receiveTime}</Text>
                        <Text fontSize="sm" align="center">
                            {receiveDate}
                        </Text>
                    </Flex>
                    <Flex direction="column" justifyContent="center" me="5">
                        <Box
                            borderColor="black"
                            borderLeftWidth="2px"
                            h="18px"
                            ms="2"
                            mb="1"
                        ></Box>
                        <Icon color="green.200" as={FaBox} h="20px" w="20px" />
                        <Box
                            borderColor="black"
                            borderLeftWidth="2px"
                            h="18px"
                            ms="2"
                            mt="1"
                        ></Box>
                    </Flex>
                    <Box py="4" me="2">
                        <Text>Order Received</Text>
                    </Box>
                </Flex>
                <Flex>
                    <Flex direction="column" me="5">
                        <Text fontSize="2xl">{receiveTime}</Text>
                        <Text fontSize="sm" align="center">
                            {receiveDate}
                        </Text>
                    </Flex>
                    <Flex direction="column" justifyContent="center" me="5">
                        <Box
                            borderColor="black"
                            borderLeftWidth="2px"
                            h="15px"
                            ms="2"
                            mb="1"
                        ></Box>
                        <Icon as={FaBox} />
                        <Box
                            borderColor="black"
                            borderLeftWidth="2px"
                            h="15px"
                            ms="2"
                            mt="2"
                        ></Box>
                    </Flex>
                    <Box py="4" me="2">
                        <Text>
                            Your order is being processed at {processLocation}
                        </Text>
                    </Box>
                </Flex>
                <Flex>
                    <Flex direction="column" me="5" pt="4">
                        <Text fontSize="2xl">{receiveTime}</Text>
                        <Text fontSize="sm" align="center">
                            {receiveDate}
                        </Text>
                    </Flex>

                    <Flex direction="column" justifyContent="center" me="5" >
                        <Box
                            borderColor="black"
                            borderLeftWidth="2px"
                            h="100%"
                            ms="2"
                            mb="1"
                        ></Box>
                        <Icon as={MdCancel} h="20px" w="20px" color="red.300" />
                        <Box
                            borderColor="black"
                            borderLeftWidth="2px"
                            h="100%"
                            ms="2"
                            mt="2"
                        ></Box>
                    </Flex>

                    <Box>
                        <Flex py="4" me="2" color="red">
                            <Box pt="4">
                                <Text> 1 item was cancelled</Text>
                            </Box>
                            <Box pt="4" me="3">
                                <Icon
                                    as={AiOutlineInfoCircle}
                                    mt="1"
                                    ms="1"
                                ></Icon>
                            </Box>
                            <Image
                                src="https://bit.ly/dan-abramov"
                                alt="Dan Abramov"
                                w="60px"
                                h="60px"
                            />
                        </Flex>
                    </Box>
                </Flex>
                <Flex>
                    <Flex direction="column" me="5">
                        <Text fontSize="2xl">{receiveTime}</Text>
                        <Text fontSize="sm" align="center">
                            {receiveDate}
                        </Text>
                    </Flex>
                    <Flex direction="column" justifyContent="center" me="5">
                        <Box
                            borderColor="black"
                            borderLeftWidth="2px"
                            h="100%"
                            ms="2"
                            mb="1"
                        ></Box>
                        <Icon
                            as={FcShipped}
                            color="blue.400"
                            h="25px"
                            w="25px"
                        />
                        <Box
                            borderColor="black"
                            borderLeftWidth="2px"
                            h="100%"
                            ms="2"
                            mt="2"
                        ></Box>
                    </Flex>
                    <Box py="4" me="2">
                        <Text>Shipped</Text>
                    </Box>
                </Flex>
                <Flex>
                    <Flex direction="column" me="5">
                        <Text fontSize="2xl">{receiveTime}</Text>
                        <Text fontSize="sm" align="center">
                            {receiveDate}
                        </Text>
                    </Flex>
                    <Flex direction="column" justifyContent="center" me="5">
                        <Box
                            borderColor="black"
                            borderLeftWidth="2px"
                            h="100%"
                            ms="2"
                            mb="1"
                        ></Box>
                        <Icon
                            as={IoCheckmarkDoneCircle}
                            h="20px"
                            w="20px"
                            color="green"
                        />
                        <Box
                            borderColor="black"
                            borderLeftWidth="2px"
                            h="100%"
                            ms="2"
                            mt="2"
                        ></Box>
                    </Flex>
                    <Box py="4" me="2">
                        <Text>Arriving {arrivalDate}</Text>
                    </Box>
                </Flex>
            </Box>
            <Flex
                px="4"
                py="2"
                bg="blackAlpha.100"
                borderRadius="4"
                w="40%"
                mt="1"
            >
                <Text fontWeight="bold" me="2">Delivery Type:</Text>
                <Text>2-6 Days</Text>
            </Flex>
        </>
    );
}
