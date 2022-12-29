import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Input,
    InputRightElement,
    InputGroup,
    Box,
    Flex,
    Text,
    Button,
    Link,
    Image,
    Divider
} from "@chakra-ui/react";
import logo from "../images/BlockifyLogo.png";
import join from "../images/join.svg";
function SignInPage() {
    const [show, setShow] = React.useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const handleClick = () => setShow(!show);
    const [accountAddress, setaccountAddress] = useState("");
    const [error, seterror] = useState(false);
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        if (items) {
            setaccountAddress(items);
        }
    }, []);
    const handleSignIn = async ()=>{
        try{const data = await axios.post(
            "http://localhost:8000/userLogin", //TODO customize this to seller and buyer
            { 
                email: email,
                password: password,
                address: accountAddress }
        );
        localStorage.setItem('isLoggedIn', true);
        {window.location.href = `http://localhost:3000/` + data.data.userType + `/` + data.data.username};
    }
        catch(err){
            seterror(true);
        }
        
    }
    return (
        <>
            <Flex flexDirection={"row"} >
                <Box
                    flex={1}
                    height="100vh"
                    bg="blue.400"
                    align="center"
                >
                    <Box
                        height="100vh"
                        width="60vh"
                        pt={20}
                        fontSize="3xl"
                        color="white"
                        fontWeight="medium"
                    >
                        <Text align="left" ms={12} fontSize="2xl">
                            The most Authentic Website for 
                            Geniune Products!
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
                <Box flex={1} align="center" px={"200"} bg="blackAlpha.50" pt={"20vh"}>
                    <Flex align={"center"} justifyContent="center" py={7}>
                        <Image src={logo} height={"30px"} width={"30px"} />
                        <Text fontWeight={"bold"} ms={2}>
                            Blockify
                        </Text>
                    </Flex>
                    <Flex pt={3} px={20}>
                        <Input
                            focusBorderColor="blue.400"
                            bg="white"
                            placeholder="Email"
                            onChange={(e) => {
                                setemail(e.target.value);
                            }}
                        />
                    </Flex>
                    <Flex pt={5} px={20}>
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
                    {error ? <Flex px={20} py={5} justifyContent="center"> <Text color="red.300"> something went wrong try again later</Text></Flex> : " "}
                    <Flex justifyContent={"space-between"} px={20} py={5}>
                        <Link pt={2} ps={2} fontSize="sm" color="gray.500">Forgot Password</Link>
                        <Button
                            bg={"blue.400"}
                            color={"white"}
                            w={"40%"}
                            h={"6vh"}
                            borderRadius={20}
                            fontSize="sm"
                            onClick={handleSignIn}
                        >
                            Sign In 
                        </Button>
                    </Flex>
                    <Box px={"5.5vw"} color="black">
                    <Divider color="pink"/>
                    </Box>
                    <Flex justifyContent={"space-between"} px={20} py={5}>
                        <Text pt={2} ps={2} fontSize="sm" color="gray.500">Need an account?</Text>
                        <Button
                            fontSize="sm"
                            variant={"outline"}
                            borderColor={"blue.400"}
                            color={"blue.400"}
                            w={"40%"}
                            h={"6vh"}
                            borderRadius={20}
                            href="/register"
                        >
                            <Link href="/register">
                            Get Started
                            </Link>
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}
export default SignInPage;
