import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Flex } from "@chakra-ui/react";
import ManufacturerChart from "../components/ManufacturerChart";
import ManufacturerSideBar from "../components/ManufacturerSideBar";
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
            <Box className="App">
                <Box mx={100}>
                    <Navbar
                        guestAccess={false}
                        heading={"Manufacturer Dashboard"}
                        manufacturerAccess={true}
                    />
                </Box>

                <Flex>
                    <ManufacturerSideBar />
                    <DashboardItems setProductsFunc={setProductsFunc} />
                    <Box
                        width="20vw"
                        mt="4"
                        h="50vh"
                        pt="3"
                        // pe="2"
                        bg="white"
                        // p={4}
                        me={4}
                        boxShadow="md"
                        rounded="md"
                        cursor="pointer"
                        _hover={{ backgroundColor: "blackAlpha.50", boxShadow:"dark-lg" }}
                    >
                        <ManufacturerChart />
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}
