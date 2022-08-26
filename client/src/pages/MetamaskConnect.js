import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import LandingPage from "./LandingPage";
import { Box, Flex, Button, Image } from "@chakra-ui/react";
import logo from "../images/BlockifyLogo.png";
import { ethers } from "ethers";
export default function MetamaskConnect(props) {
    const connect = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accountOwner = await provider.send("eth_requestAccounts", []);
        props.initAccountOwner(accountOwner);
    };

    const connectButtonPage = (
        <Flex flexDirection="column">
            <Box
                height="100vh"
                width="100vw"
                bgGradient="linear(to-r, gray.400, blue.300)"
                bg="#DDDFE8"
                align="center"
                pt="40vh"
            >
                {/* <Text color="white" fontSize="2xl" mb={5} fontWeight="semiBold"> Connect your <>Metamask Wallet</Text> */}
                <Image
                    src={logo}
                    alt="Dan Abramov"
                    height="40px"
                    width="40px"
                    mb={8}
                />
                <Button
                    onClick={connect}
                    bg="#2F3C98"
                    colorScheme="facebook"
                    borderRadius={12}
                >
                    Connect Wallet{" "}
                </Button>
            </Box>
        </Flex>
    );
    return connectButtonPage;
    //return isAuthenticated ? <LandingPage /> : connectButtonPage;
}
