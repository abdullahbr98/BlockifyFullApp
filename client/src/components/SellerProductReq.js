import React, { useState, useEffect } from "react";
import axios from "axios";
import InputComponent from "../components/InputComponent";
import productItems from "../images/productItems.png";
import { GiCardboardBoxClosed } from "react-icons/gi";
import ProductGrid from "../components/ProductGrid";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import SellerProductAccordion from "../components/SellerProductAccordion";
import {
    Box,
    SimpleGrid,
    Icon,
    Text,
    Image,
    Flex,
    Button,
    Input,
    Tooltip,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useToast,
} from "@chakra-ui/react";
const array = [
    {
        productName: "Samsung LCD",
        description: "Samsung 32 LCD with Ultra wide Display",
        price: "800$",
    },
    {
        productName: "Samsung LCD",
        description: "Samsung 32 LCD with Ultra wide Display",
        price: "800$",
    },
    {
        productName: "Samsung LCD",
        description: "Samsung 32 LCD with Ultra wide Display",
        price: "800$",
    },
    {
        productName: "Samsung LCD",
        description: "Samsung 32 LCD with Ultra wide Display",
        price: "800$",
    },
    {
        productName: "Samsung LCD",
        description: "Samsung 32 LCD with Ultra wide Display",
        price: "800$",
    },
];
export default function SellerProductReq() {
    const [productRequestFlag, setproductRequestFlag] = useState(false);
    const [productList, setproductList] = useState([]);

    const toast = useToast();
    const [productQty, setproductQty] = useState(0);
    const [modelNo, setmodelNo] = useState("");
    const [sellerAddress, setSellerAddress] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const toasterShow = () => {
        toast({
            title: "Products Requested.",
            description: "We've Requested you products for you.",
            status: "success",
            duration: 7000,
            isClosable: true,
        });
    };
    const reqProductsHandler = async () => {
        const data = await axios.post(
            "http://localhost:8000/seller/productRequest", //TODO customize this to seller and buyer
            {
                sellerAddress: sellerAddress,
                products: productQty,
                productModelNo: modelNo,
            }
        );
        toasterShow();
    };

    const productListFunction = async () => {
        const listOfProducts = await axios.get(
            "http://localhost:8000/Product/getAllProducts",
            {}
        );
        setproductList(listOfProducts.data);
        console.log("productlist:", listOfProducts);
    };

    // { params: { answer: 42 } }
    // accountAddress:items[0]

    const getAuthenticationStatus = async () => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        const result = await axios.get(
            "http://localhost:8000/Seller/getAuthenticationStatus",
            { params: { accountAddress: items[0] } }
        );
        setIsAuthenticated(result.data);
        console.log("yahan value ayi hai seller ki auth ki:", result);
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        if (items) {
            setSellerAddress(items[0]);
        }
        productListFunction();
        getAuthenticationStatus();
    }, []);
    const requestHandler = (e) => {
        setproductQty(e.target.value);
        console.log(e);
        console.log(productQty);
    };

    return (
        <Box w="90vw" align="center">
            <Flex justifyContent="center">
                <Text fontSize="3xl" me="5">
                    Request Products From Manufacturer {isAuthenticated}
                </Text>
                <Tooltip
                    label="Enter the number of products below to request items from a manufacturer"
                    fontSize="sm"
                    borderRadius="10"
                    mt="2"
                >
                    <QuestionOutlineIcon mt="4" cursor="pointer" />
                </Tooltip>
            </Flex>
            {isAuthenticated ? (
                !productRequestFlag ? (
                    <SimpleGrid
                        columns={4}
                        spacing={12}
                        ms="4"
                        justifyContent="space-between"
                    >
                        {productList?.map((productList) => {
                            return (
                                <Box
                                    onClick={() => {
                                        setmodelNo(productList.modelNo);
                                        console.log(productList.modelNo);
                                        setproductRequestFlag(true);
                                    }}
                                >
                                    <SellerProductAccordion
                                        productName={productList.productName}
                                        description={productList.description}
                                        quantity={productList.quantity}
                                        price={productList.price}
                                        modelNo={productList.modelNo}
                                    />
                                </Box>
                            );
                        })}
                    </SimpleGrid>
                ) : (
                    <Box
                        borderWidth="1px"
                        mt="4"
                        w="50%"
                        align="center"
                        boxShadow="lg"
                        p="6"
                        rounded="md"
                        bg="blackAlpha.50"
                    >
                        <Box>
                            <Image h="150px" w="150px" src={productItems} />
                        </Box>
                        <Flex justifyContent="center" h="10vh">
                            <Box pt="2">
                                {" "}
                                <Text fontSize="lg" fontWeight="bold">
                                    Number of products :{" "}
                                </Text>
                            </Box>
                            <Box>
                                <Input
                                    type="text"
                                    placeholder="No of Products"
                                    w="80%"
                                    onChange={requestHandler}
                                    bg="white"
                                    borderColor="black"
                                    borderWidth="1px"
                                />
                            </Box>
                        </Flex>
                        <Flex justifyContent="center" mt="3">
                            <Button
                                bg="blue.500"
                                variant="outline"
                                color="white"
                                borderRadius={"8"}
                                onClick={reqProductsHandler}
                                px="5"
                                boxShadow="sm"
                                fontSize="sm"
                                _hover={{ backgroundColor: "black" }}
                            >
                                Send Request
                            </Button>
                        </Flex>
                    </Box>
                )
            ) : (
                "Get Authenticated First Bro !"
            )}
            {/* {!productRequestFlag ? (
                <SimpleGrid
                    columns={4}
                    spacing={12}
                    ms="4"
                    justifyContent="space-between"
                >

                    {productList?.map((productList) => {
                        return(
                        <Box onClick={()=>{setmodelNo(productList.modelNo); console.log(productList.modelNo); setproductRequestFlag(true)}}>
                        <SellerProductAccordion
                            productName={productList.productName}
                            description={productList.description}
                            price={productList.price}
                            modelNo={productList.modelNo}
                        />
                        </Box>
                        );
                    })}

                </SimpleGrid>
            ) : (
                <Box
                    borderWidth="1px"
                    mt="4"
                    w="50%"
                    align="center"
                    boxShadow="lg"
                    p="6"
                    rounded="md"
                    bg="blackAlpha.50"
                >
                    <Box>
                        <Image h="150px" w="150px" src={productItems} />
                    </Box>
                    <Flex justifyContent="center" h="10vh">
                        <Box pt="2">
                            {" "}
                            <Text fontSize="lg" fontWeight="bold">
                                Number of products :{" "}
                            </Text>
                        </Box>
                        <Box>
                            <Input
                                type="text"
                                placeholder="No of Products"
                                w="80%"
                                onChange={requestHandler}
                                bg="white"
                                borderColor="black"
                                borderWidth="1px"
                            />
                        </Box>
                    </Flex>
                    <Flex justifyContent="center" mt="3">
                        <Button
                            bg="blue.500"
                            variant="outline"
                            color="white"
                            borderRadius={"8"}
                            onClick={reqProductsHandler}
                            px="5"
                            boxShadow="sm"
                            fontSize="sm"
                            _hover={{ backgroundColor: "black" }}
                        >
                            Send Request
                        </Button>
                    </Flex>
                </Box>
            )} */}
        </Box>
    );
}
