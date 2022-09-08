import React, { useState, useEffect } from "react";
import axios from "axios";
import InputComponent from "../components/InputComponent";
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
    const [sellerAddress, setSellerAddress] = useState(0);
    const reqProductsHandler = async () => {
        const data = await axios.post(
            "http://localhost:8000/seller/productRequest", //TODO customize this to seller and buyer
            {
                sellerAddress: sellerAddress,
                products: productQty,
            }
        );
    };
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        if (items) {
            setSellerAddress(items[0]);
        }
    }, []);
    const requestHandler = (e) => {
        setproductQty(e.target.value);
        console.log(e);
        console.log(productQty);
    };
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
                    <Text fontSize="lg">Number of products</Text>
                </Box>
                <Box>
                    <input
                        type="text"
                        placeholder="No of Products"
                        onChange={requestHandler}
                    />
                </Box>
            </Flex>
            <Flex justifyContent="center" mt="5">
                <Button
                    bg="blue.300"
                    color="white"
                    borderRadius={"17"}
                    onClick={reqProductsHandler}
                >
                    Confirm Request{" "}
                </Button>
            </Flex>
        </Box>
    );
}
