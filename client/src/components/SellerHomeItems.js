import React from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import SellerProductAccordion from "../components/SellerProductAccordion";
export default function SellerHomeItems({displayHome}) {
    return (
        <>
            {displayHome ? (<Box width="90vw" align="center">
                <Flex justifyContent="center">
                    <Text fontSize="3xl" me="5">
                        Products in Inventory
                    </Text>
                    <QuestionOutlineIcon mt="4" cursor="pointer" />
                </Flex>
                {/* TODO map function here to load products seller owns */}
                <Flex justifyContent="space-evenly" mx="5" mt="4">
                    <SellerProductAccordion productName="LG LED 40' " description="Ultra wide display with high refresh rate upto 120Hz"/>
                    <SellerProductAccordion productName="LG LED 30' " description="IPS Panel with 144Hz, 1080x720 "/>
                </Flex>

                <Flex justifyContent="center" my="5vh">
                    <Text fontSize="3xl" me="5">
                        Sold Products
                    </Text>
                    <QuestionOutlineIcon mt="4" cursor="pointer" />
                </Flex>
                <Text>You have sold nothing yet</Text>
            </Box>): <Box display="none"></Box>}
        </>
    );
}
