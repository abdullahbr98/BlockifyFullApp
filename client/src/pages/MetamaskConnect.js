import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import LandingPage from "./LandingPage";
import Section from "../components/Section";
import Faq from "../components/Faqs";
import {
    Box,
    Flex,
    Button,
    Image,
    Text,
    Heading,
    Icon,
    Link,
} from "@chakra-ui/react";
import MetamaskNavbar from "../components/MetamaskNavbar";
import logo from "../images/BlockifyLogo.png";
import { ethers } from "ethers";
import { BiRightArrowAlt } from "react-icons/bi";
export default function MetamaskConnect(props) {
    const connect = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accountOwner = await provider.send("eth_requestAccounts", []);
        props.initAccountOwner(accountOwner);
    };
    //changes
    const [owner, setowner] = useState(0);
    const setAccountOwner = (address) => {
        setowner(address);
        localStorage.setItem("UserAddress", JSON.stringify(address));
        console.log(address);
    };
    const wrapper = () => {
        connect();
        setAccountOwner();
    };
    //changes
    const connectButtonPage = (
        <>
            <MetamaskNavbar wrapper={wrapper} guestAccess={true} />
            <Flex direction="row">
                <Flex direction="column" w="50%" p="10" mb="100px" ms="40px">
                    <Link color="#2F3C98">
                        <Flex>
                            <Text
                                fontSize="lg"
                                mb="2"
                                fontWeight="bold"
                                color="#2F3C98"
                            >
                                For more information
                            </Text>
                            <Icon
                                as={BiRightArrowAlt}
                                h="25px"
                                w="25px"
                                mt="2px"
                                ms="2"
                                color="#2F3C98"
                            />
                        </Flex>
                    </Link>
                    <Heading as="h1" size="4xl" fontWeight="bold" mb="5">
                        Kickstart Your Journey With <br /> Blockify
                    </Heading>
                    <Heading as="h4" size="md" fontWeight="bold" mb="5">
                        The only place to purchase authentic products and verify
                        all users to your satisfaction. Connect your metmask
                        Wallet.
                    </Heading>
                    <Button
                        onClick={wrapper}
                        bg="#2F3C98"
                        colorScheme="facebook"
                        borderRadius={4}
                        w="30%"
                        py="7"
                    >
                        Connect Wallet{" "}
                    </Button>
                </Flex>
                <Flex direction="column" w="50%" align="center" me="25px">
                    <Image
                        src={logo}
                        alt="Dan Abramov"
                        height="250px"
                        width="250px"
                        mb={8}
                        mt="10"
                    />
                    <Heading as="h2" size="2xl" fontWeight="bold">
                        Blockify
                    </Heading>
                </Flex>
            </Flex>
            <Box align="center">
                <Heading as="h1" size="2xl" mb="40px">
                    What we provide
                </Heading>
            </Box>
            <Section />
            <Faq />
        </>
    );
    return connectButtonPage;
    //return isAuthenticated ? <LandingPage /> : connectButtonPage;
}
