import React, { useEffect, useState } from "react";
import { Text, Box, Flex, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import SellerProductAccordion from "../components/SellerProductAccordion";
export default function SellerHomeItems({ displayHome }) {
    const [productList,setProductList] = useState([]);
    const getProducts = async () =>{
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        const result = await axios.get("http://localhost:8000/Seller/getSellerProducts",{
            params:{
                accountAddress:items[0]
            }
        })
        setProductList(result.data);
    }
    useEffect(()=>{
      getProducts();
    },[])
    return (
        <>
            {displayHome ? (
                <Box width="90vw" align="center">
                    <Flex justifyContent="center">
                        <Text fontSize="3xl" me="5">
                            Products in Inventory
                        </Text>
                        <QuestionOutlineIcon mt="4" cursor="pointer" />
                    </Flex>
                    {/* TODO map function here to load products seller owns */}
                    {/* <Flex justifyContent="space-evenly" mx="5" mt="4">
                        <SellerProductAccordion
                            productName="LG LED 40' "
                            description="Ultra wide display with high refresh rate upto 120Hz"
                        />
                        <SellerProductAccordion
                            productName="LG LED 30' "
                            description="IPS Panel with 144Hz, 1080x720 "
                        />
                    </Flex> */}
                    <SimpleGrid
                            columns={4}
                            spacing={12}
                            ms="4"
                            justifyContent="space-between"
                        >
                            {productList?.map((product) => {
                        return(
                            <SellerProductAccordion
                            productName={product.name}
                            description={product.description}
                            price={product.price}
                            modelNo={product.modelNo}
                            quantity={product.quantity}
                        />
                        );})}
                        </SimpleGrid>
                    <Flex justifyContent="center" my="5vh">
                        <Text fontSize="3xl" me="5">
                            Sold Products
                        </Text>
                        <QuestionOutlineIcon mt="4" cursor="pointer" />
                    </Flex>
                    <Text>You have sold nothing yet</Text>
                </Box>
            ) : (
                <Box display="none"></Box>
            )}
        </>
    );
}
