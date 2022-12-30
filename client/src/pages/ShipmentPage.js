import React,{useState} from "react";
import ShipmentDetails from "../components/ShipmentDetails";
import BuyerNavbar from "../components/BuyerNavbar";
import BuyerFooter from "../components/BuyerFooter";
import { Box, Text, Flex } from "@chakra-ui/react";
export default function ShipmentPage() {
    const [status, setstatus] = useState("PROCESSING")
    return (
        <Box>
            <BuyerNavbar/>
        <Box mx="50px" py="5">
            <Flex justifyContent="space-between" w="40%" px="4" pt="2" pb="5" bg="blackAlpha.100" borderRadius="4">
                <Text fontWeight="bold">Shipment Details</Text>
                <Box borderRadius={5} borderColor="black" borderWidth="1px" px="4" fontSize="sm"> 
                    {status}
                </Box>
            </Flex>
            <ShipmentDetails />
        </Box>
            <BuyerFooter/>
        </Box>
    );
}
