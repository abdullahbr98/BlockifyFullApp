import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AuthenticSellersTable from "../components/AuthenticSellersTable"
import axios from "axios"
import Navbar from "../components/Navbar"
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
export default function pendingRequests() {
    return (
        <>
            <Box className="App" mx={100} mt={25}>
                <Navbar guestAccess={false} heading={"Manufacturer Dashboard"} />
            </Box>
            <Box mx={125} mt={10}>
                {/* <Button
                    colorVariant="teal"
                    mb={5}
                    onClick={}
                >
                    <ArrowBackIcon w={5} h={5} />
                </Button> */}
                <AuthenticSellersTable />
            </Box>
        </>
    );
}
