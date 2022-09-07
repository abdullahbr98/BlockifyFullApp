import React, {useState, useEffect} from "react";
import {
    Box,
    Text,
    Image,
    Flex,
    Button,
    Input,
    Tooltip,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
export default function SellerProductReq() {
    const [productQty, setproductQty] = useState(0);
    const requestHandler = (e)=>{
        setproductQty(e.target.value);
        console.log(e);
        console.log(productQty);
    }
    return (
        <Box w="90vw">
            <Flex justifyContent="center">
                <Text fontSize="3xl" me="5">
                    Request Products From Manufacturer
                </Text>
                <Tooltip
                    label="Enter the number of products below to request items from a manufacturer"
                    fontSize="sm"
                    borderRadius="10"
                    mt="2"
                >
                    <QuestionOutlineIcon mt="4" cursor="pointer" />
                </Tooltip>
            </Flex>
            <Flex justifyContent="center" mt="20vh">
                <Box pt="2" me="5">
                    {" "}
                    <Text fontSize="lg" >
                        Number of products 
                    </Text>
                </Box>
                <Box>
                    <NumberInput
                        size="md"
                        maxW={32}
                        defaultValue={1}
                        min={0}
                        max={5}
                        placeholder="qty"
                        // onChange={requestHandler} 
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Box>
            </Flex>
            <Flex justifyContent="center" mt="5">
                <Button bg="blue.300" color="white" borderRadius={"17"} >Confirm Request </Button>
            </Flex>
        </Box>
    );
}
