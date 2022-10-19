import React from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import LCD from "../images/lcd-image.jpg";

export default function SellerProductAccordion(props) {
    return (
        <>
            <Box
                borderRadius="6"
                bg="blackAlpha.50"
                w="17vw"
                h="auto"
                mt="3"
                align="left"
                borderWidth="1px"
                borderColor="gray.200"
                pb="2"
                _hover={{
                    backgroundColor: "gray.100",
                    boxShadow: "xl",
                }}
                cursor="pointer"
            >
                <Image
                    src={LCD}
                    alt="LCD"
                    w="17vw"
                    h="24vh"
                    borderTopLeftRadius="6"
                    borderTopRightRadius="6"
                />
                <Text fontSize="xl" py="1" px="2">
                    {props.productName}
                </Text>
                <Text px="2" fontSize="sm">
                    {props.description}
                </Text>
                <Flex justifyContent="space-between" mt={3}>
                    <Text ms={2} fontSize="lg">
                        {props.price}
                    </Text>
                    <Flex me={2}>
                        <Text me={1}>approved</Text>
                        <CheckCircleIcon mt={1} color="green.400" />
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
