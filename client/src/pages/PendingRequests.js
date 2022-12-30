import React from "react";
import { Box,Flex } from "@chakra-ui/react";
import ManufacturerTable from "../components/ManufacturerTable"
import Sidebar from "../components/ManufacturerSideBar"
import Navbar from "../components/Navbar"
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
