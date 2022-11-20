import React from "react";
import BuyerCard from "../components/BuyerproductCard";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
export default function BuyerProductSection() {
    return (
        <Box bg="blackAlpha.50" w="100vw">
            <Flex justifyContent="center" py="4">
                <Text fontSize="4xl" fontWeight="medium" color="blue.600">Featured Products</Text>
            </Flex>
            <SimpleGrid columns={4} p="5">
                {/* To be made dynamic */}
                <BuyerCard />
                <BuyerCard />
                <BuyerCard />
                <BuyerCard />
                <BuyerCard />
                <BuyerCard />
                <BuyerCard />
            </SimpleGrid>
        </Box>
    );
}
