import React from "react";
import axios from "axios";
import ProductGrid from "../components/ProductGrid";
import { useRef, useState } from "react";
import {
    Box,
    Flex,
    Text,
    Button,
    SimpleGrid,
    Icon,
    FormControl,
    Input,
    FormLabel,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/ManufacturerSideBar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function ManufacturerAddProduct() {
    const submitForm = async (data) => {
        await axios.post("http://localhost:8000/Manufacturer/addProduct", {});
        console.log(data);
    };
    return (
        <>
            <Box>
                <Box mx={100}>
                    <Navbar
                        guestAccess={false}
                        heading={"Products Page"}
                        manufacturerAccess={true}
                    />
                </Box>
                <Flex>
                    <Sidebar />
                    <Flex
                        direction="column"
                        mb="5"
                        justifyContent="center"
                        w="100%"
                    >
                        <Text
                            fontWeight="bold"
                            align="center"
                            fontSize="4xl"
                            mb="3"
                        >
                            Add A Product In Inventory
                        </Text>
                        <Box align="center">
                            <form onSubmit={submitForm}>
                                <Flex w="50%" direction="column">
                                    <Input placeholder="Enter Description"/>
                                    <Button type="submit" id="submit">
                                        Add Product
                                    </Button>
                                </Flex>
                            </form>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

// "description",
// "productName",
//                                         "Brand",
//                                         "modelNo",
//                                         "color",
//                                         "height",
//                                         "width",
//                                         "displayType",
//                                         "Resolution",
//                                         "HDR",
//                                         "refreshRate",
//                                         "smartCapable",
//                                         "featuredStreamingServices",
//                                         "screenMirroring",
//                                         "hdmiInputs",
//                                         "usbInputs",
//                                         "networkCompatibility",
//                                         "speakers",
//                                         "speakerType",
//                                         "Warranty",
//                                         "WarrantyTime",
//                                         "price",
