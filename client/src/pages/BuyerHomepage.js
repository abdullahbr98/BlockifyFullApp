import React from "react";
import BuyerCard from "../components/BuyerproductCard"
import { Box, Flex } from "@chakra-ui/react";
import ImageSlider from "../components/ImageSlider";
import Navbar from "../components/Navbar";
import BuyerNavbar from "../components/BuyerNavbar";
import SlideData from "../components/SlideData";
import BuyerProductSection from "../components/BuyerProductSection"
import SellerProductAccordion from "../components/SellerProductAccordion";
import BuyerFooter from "../components/BuyerFooter"

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
            <BuyerProductSection/>
            <BuyerFooter/>
        </>
    );
}
