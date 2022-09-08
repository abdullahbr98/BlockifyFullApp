import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ManufacturerTable from "../components/ManufacturerTable"
import Navbar from "../components/Navbar"
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import PendingAuthenticSellersList from "../components/PendingAuthenticSellersList"
export default function PendingVerificationRequests() {
    return (
        <>
            <Box className="App" mx={100} mt={25}>
                <Navbar guestAccess={false} heading={"Manufacturer Dashboard"} />
            </Box>
            <Box mx={125} mt={10}>
            <PendingAuthenticSellersList/>
            </Box>
        </>
    );
}
