import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Text,
    Image,
    Flex,
    Button,
    Input,
    useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import GoogleMaps from "../components/GoogleMaps"
export default function SellerShopInfo({ shopInfo }) {
    const toast = useToast();
    //31.516, lng: 74.3429
    const [editButton, seteditButton] = useState(0);
    const [latitude, setlatitude] = useState("31.516");
    const [longitude, setlongitude] = useState("74.3429");
    const [cordinates, setcordinates] = useState("31.516,74.3428");
    const [shopAddress, setshopAddress] = useState("");
    const [shopName, setshopName] = useState("");

    const setCordinatesFromMap = (value)=>{
        setcordinates(value);
    }
    const setValues = (lat,lng)=>{
        setlatitude(lat);
        setlongitude(lng);
        setcordinates(lat+','+lng);
        console.log("cordinates here man:", lat + "," + lng);
    }

    const toastIcon = () =>
        toast({
            title: "Shop Information Updated.",
            description: "We've updated your Info.",
            status: "success",
            duration: 4000,
            isClosable: true,
        });

    const editButtonHandler = () => {
        if (editButton === 0) {
            seteditButton(1);
        } else {
            seteditButton(0);
        }
    };

    const editShopInfoHandler = async () => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        console.log("accAdd:", items[0]);
        const data = await axios.post(
            "http://localhost:8000/Seller/updateShopInformation", //TODO customize this to seller and buyer
            {
                sellerAddress: items[0],
                shopName: shopName,
                cordinates: cordinates,
                shopAddress: shopAddress,
            }
        );
        toastIcon();
    };

    const converter = ()=>{
        var myArray = cordinates.split(",",2);
        setlatitude(myArray[0]);
        setlongitude(myArray[1]);
    }
    
    const getSellerShopInfo = async () => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        console.log("accAdd:", items[0]);
        const data = await axios.get(
            "http://localhost:8000/Seller/shopInformation", //TODO customize this to seller and buyer
            {
                params: { sellerAddress: items[0] },
            }
        );
        console.log(data);
        setcordinates(data.data.cordinates);
        setshopAddress(data.data.shopAddress);
        setshopName(data.data.shopName);
    };
    useEffect(() => {
        getSellerShopInfo();
    }, []);

    return (
        <Flex ms="10">
            <Box borderWidth="1px" h="60vh" borderWidth="1px" boxShadow='xl' rounded='md' bg='white' mx="5" bg="blackAlpha.30">
            {shopInfo ? (
                <Box align="center" w="40vw"  pt="8vh">
                    <Flex justifyContent="center">
                        <Text fontSize="2xl">Shop Information</Text>
                        <EditIcon
                            mt="2"
                            cursor="pointer"
                            color="green.400"
                            ms="8vh"
                            h="5"
                            w="5"
                            onClick={editButtonHandler}
                        />
                    </Flex>
                    <Box mt="10vh" align="center">
                        <Flex justifyContent="center">
                            <Text my="4" fontWeight="bold">Shop Name :</Text>
                            <Box pt="2">
                                {editButton ? (
                                    <Input
                                        placeholder={shopName}
                                        value={shopName}
                                        size="md"
                                        w="20vw"
                                        ms="7vw"
                                        onChange={(e) => {
                                            setshopName(e.target.value);
                                        }}
                                    />
                                ) : (
                                    <Text ms="7vw" size="md" pt="2">
                                        {shopName}
                                    </Text>
                                )}
                            </Box>
                        </Flex>
                        <Flex justifyContent="center">
                            <Text my="4" fontWeight="bold">Cordinates in Lg Lt :</Text>
                            <Box pt="2">
                                {editButton ? (
                                    <Input
                                        placeholder="Cordinates of Shop"
                                        placeholder={cordinates}
                                        value={cordinates}
                                        size="md"
                                        w="20vw"
                                        ms="4vw"
                                        onChange={(e) => {
                                            setcordinates(e.target.value);
                                            converter();
                                        }}
                                    />
                                ) : (
                                    <Text ms="7vw" size="md" pt="2">
                                        {cordinates}
                                    </Text>
                                )}
                            </Box>
                        </Flex>
                        <Flex justifyContent="center">
                            <Text my="4" fontWeight="bold">Shop Address Full :</Text>
                            <Box pt="2">
                                {editButton ? (
                                    <Input
                                        placeholder={shopAddress}
                                        value={shopAddress}
                                        size="md"
                                        w="20vw"
                                        ms="4vw"
                                        onChange={(e) => {
                                            setshopAddress(e.target.value);
                                        }}
                                    />
                                ) : (
                                    <Text ms="7vw" size="md" pt="2">
                                        {shopAddress}
                                    </Text>
                                )}
                            </Box>
                        </Flex>
                    </Box>

                    {editButton?<Button
                        mt="15vh"
                        bg="green.400"
                        color="white"
                        borderRadius="10"
                        onClick={editShopInfoHandler}
                    >
                        Confirm Change
                    </Button>:<Box display="none"></Box>}

                </Box>
            ) : (
                <Box display="none"></Box>
            )}
            </Box>
            <Box>
            <GoogleMaps latitude={latitude} longitude={longitude} onChange={setValues}/>
            </Box>
        </Flex>
    );
}
