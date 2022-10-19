import React from "react";
import axios from "axios";
import ProductGrid from "../components/ProductGrid";
import {useRef} from 'react'
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
const schema = yup.object().shape({
    description: yup.string().required("Description should be required please"),
    productName: yup.string().required("Description should be required please"),
    Brand: yup.string().required("Description should be required please"),
    modelNo: yup.string().required("Description should be required please"),
    color: yup.string().required("Description should be required please"),
    height: yup.string().required("Description should be required please"),
    width: yup.string().required("Description should be required please"),
    displayType: yup.string().required("Description should be required please"),
    Resolution: yup.string().required("Description should be required please"),
    HDR: yup.string().required("Description should be required please"),
    refreshRate: yup.string().required("Description should be required please"),
    smartCapable: yup
        .string()
        .required("Description should be required please"),
    featuredStreamingServices: yup
        .string()
        .required("Description should be required please"),
    screenMirroring: yup
        .string()
        .required("Description should be required please"),
    hdmiInputs: yup.string().required("Description should be required please"),
    usbInputs: yup.string().required("Description should be required please"),
    networkCompatibility: yup
        .string()
        .required("Description should be required please"),
    speakers: yup.string().required("Description should be required please"),
    speakerType: yup.string().required("Description should be required please"),
    Warranty: yup.string().required("Description should be required please"),
    WarrantyTime: yup
        .string()
        .required("Description should be required please"),
    price: yup.string().required("Description should be required please"),
});
export default function ManufacturerAddProduct() {
    const image = useRef();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = async (data) => {
        var formData = new FormData();
        const img = image.current.value;
        console.log({ errors });
        console.log("sdfsdf");
        console.log('Image=>',img);
        Object.keys(data).map((key,val)=>{
            formData.append(key,val);
        })
        formData.append('image',img);
        await axios.post("http://localhost:8000/Manufacturer/addProduct",  formData);
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
                            <form onSubmit={handleSubmit(submitForm)} encType="multipart/form-data">
                                <Flex w="50%" direction="column">
                                    <Input ref={image} type="file" name="file"/>
                                    {[
                                        "description",
                                        "productName",
                                        "Brand",
                                        "modelNo",
                                        "color",
                                        "height",
                                        "width",
                                        "displayType",
                                        "Resolution",
                                        "HDR",
                                        "refreshRate",
                                        "smartCapable",
                                        "featuredStreamingServices",
                                        "screenMirroring",
                                        "hdmiInputs",
                                        "usbInputs",
                                        "networkCompatibility",
                                        "speakers",
                                        "speakerType",
                                        "Warranty",
                                        "WarrantyTime",
                                        "price",
                                    ].map((val) => {
                                        return (
                                            <>
                                                <FormLabel>{val}</FormLabel>
                                                <Input
                                                    key={val}
                                                    type="text"
                                                    placeholder={val}
                                                    {...register(val)}
                                                />
                                                <p> {errors[val]?.message} </p>
                                            </>
                                        );
                                    })}
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

// description
// product name
// Brand
// model No
// color
// height
// width
// display type
// resolution
// HDR
// refresh Rate
// smart Capable
// featured streaming services
// screen mirroring
// hdmi inputs
// usb Inputs
// network compatibility
// speakers
// speaker Type
// Waranty
// waranty Time
// price
