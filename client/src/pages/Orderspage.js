import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import BuyerNavbar from "../components/BuyerNavbar";
import OrderSection from "../components/OrderSection"
import BuyerFooter from "../components/BuyerFooter";
export default function Orderspage() {
    return (
        <>
            <BuyerNavbar />
            <OrderSection />
            <BuyerFooter />
        </>
    );
}
