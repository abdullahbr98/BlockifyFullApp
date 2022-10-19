import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import ImageSlider from "../components/ImageSlider";
import Navbar from "../components/Navbar";
import BuyerNavbar from "../components/BuyerNavbar";
import SlideData from "../components/SlideData";
import SellerProductAccordion from "../components/SellerProductAccordion";

const array = [
    {
        productName: "Samsung LCD",
        description: "Samsung 32 LCD with Ultra wide Display",
        price: "800",
    },
    {
        productName: "Samsung LCD",
        description: "Samsung 32 LCD with Ultra wide Display",
        price: "800",
    },
    {
        productName: "Samsung LCD",
        description: "Samsung 32 LCD with Ultra wide Display",
        price: "800",
    },
    {
        productName: "Samsung LCD",
        description: "Samsung 32 LCD with Ultra wide Display",
        price: "800",
    },
    {
        productName: "Samsung LCD",
        description: "Samsung 32 LCD with Ultra wide Display",
        price: "800",
    },
];

function productList(val) {
    return (
        <SellerProductAccordion
            productName={val.productName}
            description={val.description}
            price={val.price}
        />
    );
}

export default function BuyerHomepage() {
    return (
        <>
            <BuyerNavbar />
            <Flex ms="4" justifyContent="space-between">
                {array.map(productList)}
            </Flex>
            <Box align="center" height="50%">
                <Box p={4} color="white" width="50%" align="center">
                    <ImageSlider slides={SlideData} />
                </Box>
            </Box>
        </>
    );
}
