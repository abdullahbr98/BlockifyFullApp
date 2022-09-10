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
export default function SellerShopInfo({ shopInfo }) {
    const toast = useToast();
    const [editButton, seteditButton] = useState(0);
    const [cordinates, setcordinates] = useState("");
    const [shopAddress, setshopAddress] = useState("");
    const [shopName, setshopName] = useState("");

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
        <>
            {shopInfo ? (
                <Box align="center" w="90vw"  pt="10vh">
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
                            <Text my="4">Shop Name</Text>
                            <Box pt="2">
                                {editButton ? (
                                    <Input
                                        placeholder="Shop Name"
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
                            <Text my="4">Cordinates in Lg Lt</Text>
                            <Box pt="2">
                                {editButton ? (
                                    <Input
                                        placeholder="Cordinates of Shop"
                                        size="md"
                                        w="20vw"
                                        ms="4vw"
                                        onChange={(e) => {
                                            setcordinates(e.target.value);
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
                            <Text my="4">Shop Address Full</Text>
                            <Box pt="2">
                                {editButton ? (
                                    <Input
                                        placeholder="Shop Address"
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
        </>
    );
}
