import React from "react";
import lcd from "../images/lcd-image.jpg";
import {
    Box,
    Image,
    Flex,
    Text,
    Table,
    Thead,
    Button,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import BuyerNavbar from "../components/BuyerNavbar";
import BuyerFooter from "../components/BuyerFooter";
export default function BuyerCartPage() {
    return (
        <>
            <Box w="100vw">
                <BuyerNavbar />
                <Box
                    className="ShoppingCartArea"
                    bg="blackAlpha.50"
                    py="5"
                >
                    <Flex justifyContent="center">
                        <Text
                            fontSize="4xl"
                            fontWeight="medium"
                            alignItems="center"
                        >
                            SHOPPING CART
                        </Text>
                    </Flex>
                    <Box mx="50px" bg="white">
                        <TableContainer my="20px">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Product</Th>
                                        <Th>Price</Th>
                                        <Th isNumeric>Quantity</Th>
                                        <Th isNumeric>Total</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>
                                            <Flex>
                                                <Image src={lcd} w="10rem" />
                                                <Text ps="2" fontSize="2xl">Product Name</Text>
                                            </Flex>
                                        </Td>
                                        <Td>$50.00</Td>
                                        <Td isNumeric><Text pe="40px">1</Text> <Button size="xs" colorScheme="red" borderRadius="4" me="12px" mt="2">Remove</Button></Td>
                                        <Td isNumeric fontWeight="bold" fontSize="xl" color="blue.600"> $50.00</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box px="50px" textAlign="right">
                        <Text me="4" fontWeight="bold" fontSize="xl" color="blue.600">Subtotal 50.00$</Text>
                        <Text me="4" fontWeight="medium" fontSize="lg" my="2">Shipping & taxes calculated at checkout</Text>
                        <Flex justifyContent="end" me="4" my="4">
                            <Button me="2" variant="outline" borderRadius="4" borderColor="black" _hover={{backgroundColor:"black",color:"white"}}>Update Cart</Button>
                            <Button colorScheme='facebook' borderRadius="4">Check out</Button>
                        </Flex>
                    </Box>
                </Box>
                <BuyerFooter />
            </Box>
        </>
    );
}
