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
    useToast,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/ManufacturerSideBar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function ManufacturerAddProduct() {
    const [productNo, setproductNo] = useState("");
    const [description, setdescription] = useState("");
    const [productName, setproductName] = useState("");
    const [brand, setbrand] = useState("");
    const [modelNo, setmodelNo] = useState("");
    const [color, setcolor] = useState("");
    const [height, setheight] = useState("");
    const [width, setwidth] = useState("");
    const [displayType, setdisplayType] = useState("");
    const [resolution, setresolution] = useState("");
    const [HDR, setHDR] = useState("");
    const [refreshRate, setrefreshRate] = useState("");
    const [smartCapable, setsmartCapable] = useState("");
    const [featuredStreamingServices, setfeaturedStreamingServices] =
        useState("");
    const [hdmiInputs, sethdmiInputs] = useState("");
    const [usbInputs, setusbInputs] = useState("");
    const [networkCompatibility, setnetworkCompatibility] = useState("");
    const [screenMirroring, setscreenMirroring] = useState("");
    const [speakers, setspeakers] = useState("");
    const [speakersType, setspeakersType] = useState("");
    const [warranty, setwarranty] = useState("");
    const [warrantyTime, setwarrantyTime] = useState("");
    const [price, setprice] = useState("");
    const toast = useToast();
    const submitForm = async (data) => {
        const manAddress = JSON.parse(localStorage.getItem("UserAddress"));
        await axios.post("http://localhost:8000/Manufacturer/addProduct", {
            productNo: productNo,
            description: description,
            productName: productName,
            Brand: brand,
            modelNo: modelNo,
            color: color,
            height: height,
            width: width,
            displayType: displayType,
            Resolution: resolution,
            HDR: HDR,
            refreshRate: refreshRate,
            smartCapable: smartCapable,
            featuredStreamingServices: featuredStreamingServices,
            screenMirroring: screenMirroring,
            hdmiInputs: hdmiInputs,
            usbInputs: usbInputs,
            networkCompatibility: networkCompatibility,
            speakers: speakers,
            speakerType: speakersType,
            Warranty: warranty,
            WarrantyTime: warrantyTime,
            price: price,
            manufacturerAddress: manAddress,
        });
        toast({
            title: "Products Added.",
            description: "We've Added the products for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
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
                            <FormControl onSubmit={submitForm}>
                                <Box>
                                    <Flex w="50%" direction="column">
                                        {/*have to do file uploading task soon  */}
                                        <Input type="file"/>
                                        <FormLabel>Description </FormLabel>
                                        <Input
                                            placeholder="Enter Description"
                                            lines="4"
                                            rows="4"
                                            onChange={(e) => {
                                                setdescription(e.target.value);
                                            }}
                                        />
                                        <Flex>
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Product Quantity
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Flex>
                                            <Input
                                                placeholder="Enter Product Qty"
                                                lines="4"
                                                rows="4"
                                                me="3"
                                                onChange={(e) => {
                                                    setproductNo(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Flex>
                                        <Flex mt="2">
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Product Name
                                                </FormLabel>
                                            </Box>
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Brand Name
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Flex mb="2">
                                            <Input
                                                placeholder="Enter Product Name"
                                                lines="4"
                                                rows="4"
                                                me="3"
                                                onChange={(e) => {
                                                    setproductName(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            <Input
                                                placeholder="Enter Brand"
                                                lines="4"
                                                rows="4"
                                                onChange={(e) => {
                                                    setbrand(e.target.value);
                                                }}
                                            />
                                        </Flex>
                                        <Flex mt="2">
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Device Model No
                                                </FormLabel>
                                            </Box>
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Device Color
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Flex mb="2">
                                            <Input
                                                placeholder="Enter modelNo"
                                                lines="4"
                                                rows="4"
                                                me="3"
                                                onChange={(e) => {
                                                    setmodelNo(e.target.value);
                                                }}
                                            />
                                            <Input
                                                placeholder="Enter color"
                                                lines="4"
                                                rows="4"
                                                onChange={(e) => {
                                                    setcolor(e.target.value);
                                                }}
                                            />
                                        </Flex>
                                        <Flex mt="2">
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Height in pixels
                                                </FormLabel>
                                            </Box>
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Width in pixels
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Flex mb="2">
                                            <Input
                                                placeholder="Enter height of Screen"
                                                lines="4"
                                                rows="4"
                                                me="3"
                                                onChange={(e) => {
                                                    setheight(e.target.value);
                                                }}
                                            />
                                            <Input
                                                placeholder="Enter width of your Screen"
                                                lines="4"
                                                rows="4"
                                                onChange={(e) => {
                                                    setwidth(e.target.value);
                                                }}
                                            />
                                        </Flex>
                                        <Flex mt="2">
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Display Type
                                                </FormLabel>
                                            </Box>
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Resolution of Screen
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Flex mb="2">
                                            <Input
                                                placeholder="Enter Display Type"
                                                lines="4"
                                                rows="4"
                                                me="3"
                                                onChange={(e) => {
                                                    setdisplayType(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            <Input
                                                placeholder="Enter Resolution"
                                                lines="4"
                                                rows="4"
                                                onChange={(e) => {
                                                    setresolution(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Flex>
                                        <Flex mt="2">
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>Is HDR?</FormLabel>
                                            </Box>
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Refresh Rate of Device
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Flex mb="2">
                                            <Input
                                                placeholder="Enter HDR"
                                                lines="4"
                                                rows="4"
                                                me="3"
                                                onChange={(e) => {
                                                    setHDR(e.target.value);
                                                }}
                                            />
                                            <Input
                                                placeholder="Enter refreshRate"
                                                lines="4"
                                                rows="4"
                                                onChange={(e) => {
                                                    setrefreshRate(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Flex>
                                        <Flex mt="2">
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Smart Capable or not
                                                </FormLabel>
                                            </Box>
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Streaming Services
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Flex mb="2">
                                            <Input
                                                placeholder="Smart Capable?"
                                                lines="4"
                                                rows="4"
                                                me="3"
                                                onChange={(e) => {
                                                    setsmartCapable(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            <Input
                                                placeholder="Enter featured Streaming Services"
                                                lines="4"
                                                rows="4"
                                                onChange={(e) => {
                                                    setfeaturedStreamingServices(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Flex>
                                        <Flex mt="2">
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Screen Mirroring in device
                                                </FormLabel>
                                            </Box>
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Total Hdmi Inputs
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Flex mb="2">
                                            <Input
                                                placeholder="Does it have screenMirroring?"
                                                lines="4"
                                                rows="4"
                                                me="3"
                                                onChange={(e) => {
                                                    setscreenMirroring(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            <Input
                                                placeholder="No of hdmiInputs?"
                                                lines="4"
                                                rows="4"
                                                onChange={(e) => {
                                                    sethdmiInputs(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Flex>
                                        <Flex mt="2">
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    USB Inputs
                                                </FormLabel>
                                            </Box>
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Compatibility with Network
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Flex mb="2">
                                            <Input
                                                placeholder="No of usb inputs?"
                                                lines="4"
                                                rows="4"
                                                me="3"
                                                onChange={(e) => {
                                                    setusbInputs(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            <Input
                                                placeholder="does it have network Compatibility?"
                                                lines="4"
                                                rows="4"
                                                onChange={(e) => {
                                                    setnetworkCompatibility(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Flex>
                                        <Flex mt="2">
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    No of Speakers
                                                </FormLabel>
                                            </Box>
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Speakers Type
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Flex mb="2">
                                            <Input
                                                placeholder=" no  of speakers"
                                                lines="4"
                                                rows="4"
                                                me="3"
                                                onChange={(e) => {
                                                    setspeakers(e.target.value);
                                                }}
                                            />
                                            <Input
                                                placeholder="Speakers Type?"
                                                lines="4"
                                                rows="4"
                                                onChange={(e) => {
                                                    setspeakersType(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Flex>
                                        <Flex mt="2">
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>Warranty</FormLabel>
                                            </Box>
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Warranty Time
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Flex mb="2">
                                            <Input
                                                placeholder="Warranty Valid?"
                                                lines="4"
                                                rows="4"
                                                me="3"
                                                onChange={(e) => {
                                                    setwarranty(e.target.value);
                                                }}
                                            />
                                            <Input
                                                placeholder="Warranty Time?"
                                                lines="4"
                                                rows="4"
                                                onChange={(e) => {
                                                    setwarrantyTime(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </Flex>
                                        <Flex mt="2">
                                            <Box alignItems="left" w="50%">
                                                <FormLabel>
                                                    Product Price
                                                </FormLabel>
                                            </Box>
                                        </Flex>
                                        <Input
                                            mb="2"
                                            placeholder="price in $"
                                            lines="4"
                                            rows="4"
                                            onChange={(e) => {
                                                setprice(e.target.value);
                                            }}
                                        />
                                        <Box>
                                            <Button
                                                onClick={submitForm}
                                                my="2"
                                                bg="blue.200"
                                                color="white"
                                                _hover={{
                                                    backgroundColor:
                                                        "green.200",
                                                }}
                                                w="50%"
                                            >
                                                Add Product
                                            </Button>
                                        </Box>
                                    </Flex>
                                </Box>
                            </FormControl>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

// "description",
// "productName",
// "Brand",
// "modelNo",
// "color",
// "height",
// "width",
// "displayType",
// "Resolution",
//  "HDR",
//  "refreshRate",
//  "smartCapable",
//  "featuredStreamingServices",
//  "screenMirroring",
//  "hdmiInputs",
//  "usbInputs",
//  "networkCompatibility",
//                                         "speakers",
//                                         "speakerType",
//                                         "Warranty",
//                                         "WarrantyTime",
//                                         "price",
