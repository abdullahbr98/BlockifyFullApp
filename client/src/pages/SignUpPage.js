import React, { useState, useEffect } from "react";
import axios from "axios";
import RadioCardUse from "../components/RadioCardUse";
import {
    Input,
    InputLeftAddon,
    InputRightElement,
    InputGroup,
    Box,
    Flex,
    Text,
    Button,
    Link,
    Image,
} from "@chakra-ui/react";
import logo from "../images/BlockifyLogo.png";
import join from "../images/join.svg";
function SignUpPage() {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const [show1, setShow1] = React.useState(false);
    const handleClick1 = () => setShow1(!show1);
    //user credentials states
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [userType, setuserType] = useState("");
    const [accountAddress, setaccountAddress] = useState("");
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        if (items) {
            setaccountAddress(items);
        }
    }, []);
    const userTypeHandler = (typeValue) => {
        console.log(typeValue);
        setuserType(typeValue);
    };

    const signUpFunction = async () => {
        // console.log({ user });
        //axios intercepter
        if(userType==="Manufacturer"){
        console.log("Account Address : ", accountAddress);
        const data = await axios.post(
            "http://localhost:8000/Manufacturer/signup",
            {
                userType: userType, 
                phoneNumber: phone,
                firstName: fname,
                lastName: lname,
                username: username,
                email: email,
                password: password, //TODO make this bycrypt function
                accountAddress: accountAddress
            }
        );}
        else if(userType==="Seller"){
            const data = await axios.post(
                "http://localhost:8000/Seller/signup",
                {
                    userType: userType,
                    phoneNumber: phone,
                    firstName: fname,
                    lastName: lname,
                    username: username,
                    email: email,
                    password: password, //TODO make this bycrypt function
                    sellerAddress: accountAddress
                }
            );

        }
        window.location.href = "http://localhost:3000/";
    };
    return (
        <>
            <Flex flexDirection={"row"} borderRadius={"12"}>
                <Box flex={1} height="100vh" bg="blue.400" align="center">
                    <Box
                        height="100vh"
                        width="60vh"
                        pt={20}
                        fontSize="3xl"
                        color="white"
                        fontWeight="medium"
                    >
                        <Text align="left" ms={12}>
                            A Few clicks away <br /> From Becoming an <br />
                            Authentic Seller.
                        </Text>
                        <Box>
                            <Image
                                src={join}
                                height={"40vh"}
                                width={"35vw"}
                                mt={20}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box flex={1} align="center" px={"200"} bg="blackAlpha.50">
                    <Flex align={"center"} justifyContent="center" py={7}>
                        <Image src={logo} height={"30px"} width={"30px"} />
                        <Text fontWeight={"bold"} ms={2}>
                            Blockify
                        </Text>
                    </Flex>
                    <Flex
                        align={"center"}
                        justifyContent="center"
                        fontSize={"large"}
                        fontWeight={"bold"}
                    >
                        <Text>
                            Welcome To Blockify Dapp Where Sellers <br /> Sell
                            Authentic Products
                        </Text>
                    </Flex>
                    <Flex align={"center"} justifyContent="center" py={5}>
                        <Text>Already signed up?</Text>{" "}
                        <Link color={"blue.600"} href="/login">
                            {" "}
                            Login
                        </Link>
                    </Flex>
                    <Flex align={"center"} justifyContent="center">
                        <RadioCardUse userTypeHandler={userTypeHandler} />
                    </Flex>
                    <Flex pt={3}>
                        <InputGroup>
                            <InputLeftAddon children="+92" />
                            <Input
                                type="tel"
                                placeholder="phone number"
                                focusBorderColor="blue.400"
                                bg="white"
                                onChange={(e) => {
                                    setphone(e.target.value);
                                }}
                            />
                        </InputGroup>
                    </Flex>
                    <Flex pt={3}>
                        <Input
                            bg="white"
                            focusBorderColor="blue.400"
                            placeholder="First Name"
                            onChange={(e) => {
                                setfname(e.target.value);
                            }}
                        />
                        <Input
                            bg="white"
                            focusBorderColor="blue.400"
                            placeholder="Last Name"
                            onChange={(e) => {
                                setlname(e.target.value);
                            }}
                        />
                    </Flex>
                    <Flex pt={3}>
                        <Input
                            bg="white"
                            focusBorderColor="blue.400"
                            placeholder="Create a username"
                            onChange={(e) => {
                                setusername(e.target.value);
                            }}
                        />
                    </Flex>
                    <Flex pt={3}>
                        <Input
                            bg="white"
                            focusBorderColor="blue.400"
                            placeholder="Your email address"
                            onChange={(e) => {
                                setemail(e.target.value);
                            }}
                        />
                    </Flex>
                    <Flex pt={3}>
                        <InputGroup size="md">
                            <Input
                                bg="white"
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                                onChange={(e) => {
                                    setpassword(e.target.value);
                                }}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleClick}
                                >
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                    <Flex py={3}>
                        <InputGroup size="md">
                            <Input
                                bg="white"
                                pr="4.5rem"
                                type={show1 ? "text" : "password"}
                                placeholder="Confirm password"
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={handleClick1}
                                >
                                    {show1 ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                    <Flex justifyContent={"center"}>
                        <Button
                            bg={"blue.400"}
                            color={"white"}
                            w={"40%"}
                            h={"6vh"}
                            borderRadius={5}
                            fontWeight="medium"
                            onClick={signUpFunction}
                        >
                            Create Account
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}
export default SignUpPage;
