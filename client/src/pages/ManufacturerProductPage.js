import React, { useState,useEffect } from "react";
import SellerProductAccordion from "../components/SellerProductAccordion"
import axios from "axios"
import { Box, Flex, Text, SimpleGrid, Icon } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { IoIosAddCircle } from "react-icons/io";
import Sidebar from "../components/ManufacturerSideBar";

export default function ManufacturerProductPage() {
    const [productList, setproductList] = useState([]);
    const productListFunction = async () => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        const listOfProducts = await axios.get(
            "http://localhost:8000/Product/getAllProducts",
            {
                params:{
                    manufacturerAddress:items
                }
            }
        );
        setproductList(listOfProducts.data);
        console.log("productlist:", listOfProducts);
    };

    useEffect(() => {
        productListFunction();
    }, []);
    return (
        <>
            <Box>
                <Box mx={100}>
                    <Navbar
                        guestAccess={false}
                        heading={"Products Page"}
                        manufacturerAccess={true}
                    />
                </Box>
                <Flex>
                    <Sidebar />
                    <Flex direction="column" mb="5">
                        <Text
                            fontWeight="bold"
                            align="center"
                            fontSize="4xl"
                            mb="3"
                        >
                            Products In Inventory
                        </Text>
                        <SimpleGrid
                            columns={4}
                            spacing={12}
                            ms="4"
                            justifyContent="space-between"
                        >
                            {productList?.map((productList) => {
                                console.log(productList);
                        return(
                            <SellerProductAccordion
                            image={productList.image}
                            productName={productList.productName}
                            description={productList.description}
                            quantity={productList.productNo}
                            price={productList.price}
                            modelNo={productList.modelNo}
                        />
                        );})}
                            <Flex
                                bg="gray.100"
                                w="auto"
                                _hover={{
                                    backgroundColor: "gray.100",
                                    boxShadow: "dark-lg",
                                }}
                                cursor="pointer"
                                borderRadius={12}
                                mt="3"
                                borderWidth="1px"
                                align="center"
                                justifyContent="center"
                                textAlign="center"
                                direction="column"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href =
                                        "/ManufacturerAddProduct";
                                }}
                            >
                                <Icon
                                    as={IoIosAddCircle}
                                    h="100px"
                                    w="100px"
                                    color="green.200"
                                />
                            </Flex>
                        </SimpleGrid>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
