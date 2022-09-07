import React from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function SellerProductAccordion() {
    return (
        <>
            <Box borderRadius="6" bg="blackAlpha.50" w="17vw" h="40vh" mt="3" align="left">
                <Image
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                    w="17vw"
                    h="24vh"
                    borderTopLeftRadius="6"
                    borderTopRightRadius="6"
                />
                <Text fontSize="xl" py="1" px="2">
                    Product Name
                </Text>
                <Flex justifyContent="space-between" mt={7}>
                    <Text ms={2}>32$</Text>
                    <Flex me={2}>
                        <Text me={1}>approved</Text>
                        <CheckCircleIcon mt={1} color="green.400"/>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
