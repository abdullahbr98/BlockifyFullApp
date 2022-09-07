import React from "react";
import { Box, Text, Image, Flex, Button, Input } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
export default function SellerProfileInfo({profileInfoFunc}) {
    return (
        <>
            {profileInfoFunc ? (<Box align="center" w="90vw">
                <Flex justifyContent="center">
                    <Text fontSize="2xl">Account Information</Text>
                    <EditIcon mt="2" cursor="pointer" color="green.400" ms="8vh" h="5" w="5"/>
                </Flex>
                <Box mt="10vh" align="center">
                    <Flex justifyContent="center">
                        <Text my="4">Username</Text>
                        <Box pt="2">
                            <Input
                                placeholder="Username"
                                size="md"
                                w="20vw"
                                ms="5vw"
                            />
                        </Box>
                    </Flex>
                    <Flex justifyContent="center">
                        <Text my="4">Email</Text>
                        <Box pt="2">
                            <Input
                                placeholder="Email"
                                size="md"
                                w="20vw"
                                ms="7vw"
                            />
                        </Box>
                    </Flex>
                    <Flex justifyContent="center">
                        <Text my="4">Password</Text>
                        <Box pt="2">
                            <Input
                                placeholder="Password"
                                size="md"
                                w="20vw"
                                ms="5vw"
                            />
                        </Box>
                    </Flex>
                </Box>
                <Button mt="15vh" bg="green.400" color="white" borderRadius="10">Confirm Change</Button>
            </Box>): <Box display="none"></Box>}
        </>
    );
}
