import React, { useEffect, useState } from "react";
import axios from "axios";
import BuyerCard from "../components/BuyerproductCard";
import {
    Box,
    Flex,
    Link,
    SimpleGrid,
    Text,
    InputGroup,
    InputRightElement,
    Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export default function BuyerProductSection() {
    const [searchArray, setsearchArray] = useState("");
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

    const wrapper = (p) => {
        {
            window.location.href = `http://localhost:3000/product/` + p.modelNo + "/" +p.seller;
        }
    };
    const arrayDataMap = (searchArray) => {
        return products.filter((p)=>{return(p.name.toLowerCase().includes(searchArray.toLowerCase()))}).map((p,index) => {
            return (
                <div
                    key={index}
                    onClick={() => {
                        wrapper(p);
                    }}
                >
                    <BuyerCard
                        sellerName={p.sellerName}
                        name={p.name}
                        price={p.price}
                        quantity={p.quantity}
                        description={p.description}
                        modelNo={p.modelNo}
                        productTrack={productTrack}
                        sellerAddress = {p.seller}
                    />
                </div>
            );
        });
    };
    useEffect(() => {
        getProductInfo();
        console.log(searchArray);
    }, [searchArray]);

    return (
        <Box bg="blackAlpha.50" w="100vw">
            <Flex ms="3" w="100%" justifyContent="center">
                <Box mt="4">
                    <InputGroup>
                        <InputRightElement
                            pointerEvents="none"
                            children={<SearchIcon color="blue.400" />}
                        />
                        <Input
                            type="text"
                            variant="flushed"
                            placeholder="Search Products"
                            bg="white"
                            w="35vw"
                            borderRadius="2px"
                            ps="2"
                            onChange={(e) => {
                                setsearchArray(e.target.value);
                            }}
                        />
                    </InputGroup>
                </Box>
            </Flex>
            <Flex justifyContent="center" ps="4" py="4">
                <Text fontSize="3xl" fontWeight="medium" color="blue.600">
                    Featured Products
                </Text>
            </Flex>
            <Box ps="50px">
                <SimpleGrid columns={4} p="5">
                    {
                        arrayDataMap(searchArray)
                        // products.map((p) => {
                        //     return (
                        //         <div
                        //             onClick={() => {
                        //                 wrapper(p);
                        //             }}
                        //         >
                        //             <BuyerCard
                        //                 sellerName={p.sellerName}
                        //                 name={p.name}
                        //                 price={p.price}
                        //                 quantity={p.quantity}
                        //                 description={p.description}
                        //                 modelNo={p.modelNo}
                        //                 productTrack={productTrack}
                        //             />
                        //         </div>
                        //     );
                        // })
                    }
                </SimpleGrid>
            </Box>
        </Box>
    );
}
