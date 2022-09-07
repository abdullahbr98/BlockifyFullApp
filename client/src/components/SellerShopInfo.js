import React from "react";
import { Box, Text, Image, Flex, Button, Input } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
export default function SellerShopInfo({shopInfo}) {
    return (
        <>
            {shopInfo ? (<Box align="center" w="90vw">
                <Flex justifyContent="center">
                    <Text fontSize="2xl">Shop Information</Text>
                    <EditIcon mt="2" cursor="pointer" color="green.400" ms="8vh" h="5" w="5"/>
                </Flex>
                <Box mt="10vh" align="center">
                    <Flex justifyContent="center">
                        <Text my="4">Shop Name</Text>
                        <Box pt="2">
                            <Input
                                placeholder="Shop Name"
                                size="md"
                                w="20vw"
                                ms="7vw"
                            />
                        </Box>
                    </Flex>
                    <Flex justifyContent="center">
                        <Text my="4">Cordinates in Lg Lt</Text>
                        <Box pt="2">
                            <Input
                                placeholder="Email"
                                size="md"
                                w="20vw"
                                ms="4vw"
                            />
                        </Box>
                    </Flex>
                    <Flex justifyContent="center">
                        <Text my="4">Shop Address Full</Text>
                        <Box pt="2">
                            <Input
                                placeholder="Address"
                                size="md"
                                w="20vw"
                                ms="4vw"
                            />
                        </Box>
                    </Flex>
                </Box>
                <Button mt="15vh" bg="green.400" color="white" borderRadius="10">Confirm Change</Button>
            </Box>): <Box display="none"></Box>}
        </>
    );
}
