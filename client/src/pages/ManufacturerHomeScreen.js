import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Flex, Text, Button, SimpleGrid } from "@chakra-ui/react";
import ManufacturerTable from "../components/ManufacturerTable";
import ManufacturerSideBar from "../components/ManufacturerSideBar";
import AuthenticSellersList from "../components/AuthenticSellersList";
import { ArrowBackIcon } from "@chakra-ui/icons";
import DashboardItems from "../components/DashboardItems";
import SellerProductAccordion from "../components/SellerProductAccordion";
import ProductGrid from "../components/ProductGrid";
export default function ManufacturerHomeScreen() {
    const { id } = useParams();
    const [products, setproducts] = useState(false);
    const [authenticSeller, setauthenticSeller] = useState(false);
    const [isLoggedIn, setisLoggedIn] = useState(true);
    const setProductsFunc = () => {
        if (products) {
            setproducts(false);
        } else {
            setproducts(true);
        }
    };
    const setauthenticSellerFunc = () => {
        if (authenticSeller) {
            setauthenticSeller(false);
        } else {
            setauthenticSeller(true);
        }
    };
    return (
        <Box>
            <Box className="App">
                <Box mx={100}>
                <Navbar
                    guestAccess={false}
                    heading={"Manufacturer Dashboard"}
                    manufacturerAccess={true}
                />
                </Box>

                <Flex >
                    <ManufacturerSideBar/>
                    <DashboardItems setProductsFunc={setProductsFunc} />
                </Flex>
            </Box>
        </Box>
    );
}
