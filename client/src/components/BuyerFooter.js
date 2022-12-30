import React from "react";
import Logo from "../images/BlockifyLogo.png";
import {
    Box,
    Flex,
    SimpleGrid,
    Text,
    Image,
    Button,
    Link,
} from "@chakra-ui/react";
export default function BuyerFooter() {
    return (
        <>
            <SimpleGrid
                w="100vw"
                bg="gray.700"
                color="white"
                columns={4}
                spacing={5}
            >
                <Box p="5">
                    <Flex>
                        <Image src={Logo} w="5rem" />
                        <Text
                            fontWeight="bold"
                            color="white"
                            fontSize="3xl"
                            pt="4"
                            ps="4"
                        >
                            Blockify
                        </Text>
                    </Flex>
                    <Text mt="2" fontWeight="medium">
                        Decentralized Blockchain Web <br /> App for Authentic
                        Seller Products.
                    </Text>
                </Box>
                <Box
                    p="5"
                    textAlign="center"
                    fontSize="2xl"
                    fontWeight="medium"
                >
                    <Text>Become A Member</Text>
                    <Text fontSize="md" mt="3" fontWeight="thin">
                        Register Now to get authentic Products. Become our
                        member now!
                    </Text>
                    <Link href="/register">
                        <Button
                            colorScheme="blue"
                            variant="outline"
                            mt="5"
                            _hover={{
                                color: "white",
                                backgroundColor: "blue.700",
                            }}
                        >
                            Register now
                        </Button>
                    </Link>
                </Box>
                <Box
                    p="5"
                    textAlign="center"
                    fontSize="2xl"
                    fontWeight="medium"
                >
                    <Text>Links</Text>
                    <Text fontSize="md" my="2" fontWeight="thin">
                        {" "}
                        <Link href="https://www.facebook.com/"> Facebook </Link>
                    </Text>
                    <Text fontSize="md" my="2" fontWeight="thin">
                        {" "}
                        <Link href="https://www.instagram.com/">
                            Instagram{" "}
                        </Link>
                    </Text>
                    <Text fontSize="md" my="2" fontWeight="thin">
                        {" "}
                        <Link href="https://www.twitter.com/">Twitter </Link>
                    </Text>
                    <Text fontSize="md" my="2" fontWeight="thin">
                        {" "}
                        <Link href="https://www.pinterest.com/">
                            Pinterest{" "}
                        </Link>
                    </Text>
                </Box>
                <Box
                    p="5"
                    textAlign="center"
                    fontSize="2xl"
                    fontWeight="medium"
                >
                    <Text>Get In touch</Text>
                    <Text fontWeight="thin" p="2" fontSize="md">
                        To help us develop this App. Checkout our Github Repo.
                    </Text>
                    <Link
                        href="https://github.com/abdullahbr98/BlockifyFullApp"
                        fontWeight="medium"
                        fontSize="lg"
                        color="gray.500"
                    >
                        <Button variant="outline" color="gray" _hover={{
                                color: "white",
                                backgroundColor: "blackAlpha.800",
                            }}>GitHub Repo</Button>
                    </Link>
                </Box>
            </SimpleGrid>
            <Flex
                justifyContent="center"
                w="100vw"
                bg="gray.700"
                color="white"
                py="5"
            >
                <Text fontSize="medium">
                    {" "}
                    © 2022 Blockify. All rights reserved.
                </Text>
            </Flex>
        </>
    );
}
