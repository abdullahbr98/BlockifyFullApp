import React, { useEffect, useState } from "react";
import lcd from "../images/lcd-image.jpg";
import {
    Box,
    useToast,
    Image,
    Flex,
    Text,
    Table,
    Thead,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
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
    const [productInfo, setproductInfo] = useState(null);
    const [upperLimitQuantity, setupperLimitQuantity] = useState(0);
    const [quantity, setquantity] = useState(1);
    const toast = useToast();

    const updateCartFunction = ()=>{
        localStorage.setItem("cartItems", null);
        {window.location.href = `http://localhost:3000/Buyer/` + localStorage.getItem("usernameOfBuyer")};
    }

    const removeItem = () => {
        localStorage.setItem("cartItems", null);
        setproductInfo(null);
        toast({
            title: "Item removed.",
            description: "Your Cart Item has been removed.",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };

    const checkoutHandler = ()=>{
        // localStorage.setItem('modelNo', modelNo);
        localStorage.setItem('noOfProducts', quantity);
        console.log("i am clicked");
        window.location.href="http://localhost:3000/stripePaymentBuyer"
    }


    useEffect(() => {
        setproductInfo(JSON.parse(localStorage.getItem("cartItems")));
        setupperLimitQuantity(localStorage.getItem("cartItemQuantity"));
        console.log(productInfo);
    }, [quantity]);

    return (
        <>
            <Box w="100vw">
                <BuyerNavbar />
                <Box className="ShoppingCartArea" bg="blackAlpha.50" py="5">
                    <Flex justifyContent="center">
                        <Text
                            fontSize="4xl"
                            fontWeight="medium"
                            alignItems="center"
                        >
                            SHOPPING CART
                        </Text>
                    </Flex>
                    {productInfo ? (
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
                                                    <Image
                                                        src={lcd}
                                                        w="10rem"
                                                    />
                                                    <Text ps="2" fontSize="2xl">
                                                        {
                                                            productInfo.productName
                                                        }
                                                    </Text>
                                                </Flex>
                                            </Td>
                                            <Td>${productInfo.price}.00</Td>
                                            <Td isNumeric>
                                                <Flex justifyContent="right">
                                                    <NumberInput
                                                        step={1}
                                                        me="3"
                                                        w="5vw"
                                                        defaultValue={1}
                                                        min={1}
                                                        max={
                                                            upperLimitQuantity
                                                        }
                                                        onChange={(e) => {
                                                            setquantity(e);
                                                        }}
                                                    >
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                    <Button
                                                        size="xs"
                                                        colorScheme="red"
                                                        borderRadius="4"
                                                        mt="2"
                                                        onClick={removeItem}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Flex>
                                            </Td>
                                            <Td
                                                isNumeric
                                                fontWeight="bold"
                                                fontSize="xl"
                                                color="blue.600"
                                            >
                                                {" "}
                                                ${productInfo.price * quantity}
                                                .00
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Box px="50px" textAlign="right">
                                <Text
                                    me="4"
                                    fontWeight="bold"
                                    fontSize="xl"
                                    color="blue.600"
                                >
                                    Subtotal {productInfo.price * quantity}$
                                </Text>
                                <Text
                                    me="4"
                                    fontWeight="medium"
                                    fontSize="lg"
                                    my="2"
                                >
                                    Shipping & taxes calculated at checkout
                                </Text>
                                <Flex justifyContent="end" me="4" my="4">
                                    <Button
                                        me="2"
                                        variant="outline"
                                        borderRadius="4"
                                        borderColor="black"
                                        _hover={{
                                            backgroundColor: "black",
                                            color: "white",
                                        }}
                                        onClick={updateCartFunction}
                                    >
                                        Update Cart
                                    </Button>
                                        <Button
                                            colorScheme="facebook"
                                            borderRadius="4"
                                            onClick= {() => {checkoutHandler()}}
                                        >
                                            
                                            Check out
                                        </Button>
                                </Flex>
                            </Box>
                        </Box>
                    ) : (
                        <Flex py="20px">
                            <Text
                                fontSize="lg"
                                fontWeight="thin"
                                mx="50px"
                                pb="15vh"
                            >
                                Your Shopping Cart is Empty
                            </Text>
                        </Flex>
                    )}
                </Box>
                <BuyerFooter />
            </Box>
        </>
    );
}
