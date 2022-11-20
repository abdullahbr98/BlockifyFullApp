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
        <Box textAlign="center" w="15rem" m="5" _hover={{backgroundColor:"gray.100",boxShadow:"dark-lg", cursor:"pointer"}} borderRadius="5">
            <Box>
                <Image src={Tv} borderTopRightRadius="5" borderTopLeftRadius="5"></Image>
                <Text fontSize="2xl" mt="4" py="4">Title of Item</Text>
            </Box>
        </Box>
    );
}