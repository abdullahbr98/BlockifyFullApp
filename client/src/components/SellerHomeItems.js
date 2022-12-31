import React, { useEffect, useState } from "react";
import { Text, Box, Flex, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import SellerProductAccordion from "../components/SellerProductAccordion";
export default function SellerHomeItems({ displayHome }) {
    const [productList,setProductList] = useState([]);
    const getProducts = async () =>{
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        const result = await axios.get("http://localhost:8000/product/getAllProductsSeller",{
            params:{
                sellerAddress:items
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
                    <SimpleGrid
                            columns={4}
                            spacing={12}
                            ms="4"
                            justifyContent="space-between"
                        >
                            {productList?.map((product,index) => {
                        return(
                            <SellerProductAccordion
                            productName={product.item.productName}
                            description={product.item.description}
                            price={product.item.price}
                            modelNo={product.item.modelNo}
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
