import React from "react";
import Tv from "../images/lcd-image.jpg";
import {
    Box,
    Icon,
    Flex,
    Select,
    Image,
    InputGroup,
    InputRightElement,
    Input,
    Link,
    Text,
} from "@chakra-ui/react";
export default function BuyerproductCard() {
    return (
        <Box textAlign="center" w="15rem" m="5">
            <Box p="4">
                <Image src={Tv}></Image>
                <Text fontSize="2xl" mt="4">Title of Item</Text>
            </Box>
        </Box>
    );
}