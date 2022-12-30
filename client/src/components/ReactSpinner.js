import { useState, CSSProperties } from "react";
import { Box, Text, Spinner, Flex } from "@chakra-ui/react";

export default function ReactSpinner() {
    return (
        <Box m="5vh" w="80vw" h="100%" my="20vh">
            <div className="sweet-loading">
                <Flex justifyContent="center">
                    <Spinner
                        thickness="4px"
                        w="100px"
                        h="100px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                        align="center"
                    />
                </Flex>
                <Text align="center" mt="6vh" fontWeight="bold">
                    Fetching Transactions From Secure Blockchain Network
                </Text>
            </div>
        </Box>
    );
}
