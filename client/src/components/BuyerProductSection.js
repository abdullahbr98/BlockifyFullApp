import React, { useEffect, useState } from "react";
import axios from "axios";
import BuyerCard from "../components/BuyerproductCard";
import { Box, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
export default function BuyerProductSection() {
    const [products, setproducts] = useState([]);
    const [productTrack, setproductTrack] = useState([]);
    const getProductInfo = async () => {
        const product = await axios.get(
            "http://localhost:8000/Seller/getAllSellerProducts",
            {}
        );
        console.log("AllsellerDataShown:", product.data);
        setproducts(product.data);
    };

        const wrapper = (p)=>{
            {window.location.href = `http://localhost:3000/product/` + p.modelNo} 
            //{window.location.href = `http://localhost:3000/` + data.data.userType + `/` + data.data.username};
        }
    useEffect(() => {
        getProductInfo();
    }, []);

    return (
        <Box bg="blackAlpha.50" w="100vw">
            <Flex justifyContent="center" py="4">
                <Text fontSize="4xl" fontWeight="medium" color="blue.600">
                    Featured Products
                </Text>
            </Flex>
            <SimpleGrid columns={4} p="5">
                {products.map((p) => {
                    return (
                        <div onClick={()=>{wrapper(p)}}>
                            <BuyerCard
                                sellerName={p.sellerName}
                                name={p.name}
                                price={p.price}
                                quantity={p.quantity}
                                description={p.description}
                                modelNo={p.modelNo}
                                productTrack={productTrack}
                            />
                        </div>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
}
