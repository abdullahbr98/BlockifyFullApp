import React from "react";
import { Box, Button,Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ManufacturerTable from "../components/ManufacturerTable"
import Sidebar from "../components/ManufacturerSideBar"
import Navbar from "../components/Navbar"
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
export default function pendingRequests() {
    return (
        <>
            <Box className="App" mx={100} mt={25}>
                <Navbar guestAccess={false} heading={"Manufacturer Dashboard"} />
            </Box>
            <Flex>
            <Sidebar/>
            <Box mx={125} mt={10} w="100%">
                <ManufacturerTable />
            </Box>
            </Flex>
        </>
    );
}
