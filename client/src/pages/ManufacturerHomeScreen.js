import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import ManufacturerTable from "../components/ManufacturerTable";
import AuthenticSellersList from "../components/AuthenticSellersList";
import { ArrowBackIcon } from "@chakra-ui/icons";
import DashboardItems from "../components/DashboardItems";
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
            <Box className="App" mx={100} mt={25}>
                <Navbar guestAccess={false} heading={"Manufacturer Dashboard"} />
            </Box>
            {/* TO DO bg="blackAlpha.50" */}
                <DashboardItems setProductsFunc={setProductsFunc} />
        </Box>
    );
}
