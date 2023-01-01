import React, { useEffect, useState } from "react";
import axios from "axios";
import BuyerCard from "../components/BuyerproductCard";
import {
    Box,
    Flex,
    Link,
    SimpleGrid,
    Select,
    Text,
    InputGroup,
    InputRightElement,
    Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export default function BuyerProductSection() {
    const [searchArray, setsearchArray] = useState("");
    const [sortBy, setsortBy] = useState("name-ascending");
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

    const sortProductsByNameCompareFunction = (p1,p2) => {
        if (p1.name.toLowerCase() > p2.name.toLowerCase()) {
            return 1;
        } else if (p1.name < p2.name) {
            return -1;
        } else {
            return 0;
        }
    };
    const sortProductsByNameDescendingCompareFunction = (p1,p2) => {
        if (p1.name.toLowerCase() > p2.name.toLowerCase()) {
            return -1;
        } else if (p1.name < p2.name) {
            return 1;
        } else {
            return 0;
        }
    };
    const sortProductsByPriceCompareFunction = (p1,p2) => {
        return p1.price - p2.price;
    };
    const sortProductsByPriceDescendingCompareFunction = (p1,p2) => {
        return p2.price - p1.price;
    };

    const compareFunctionMap = {
        "name-ascending":sortProductsByNameCompareFunction,
        "name-descending":sortProductsByNameDescendingCompareFunction,
        "price-ascending":sortProductsByPriceCompareFunction,
        "price-descending":sortProductsByPriceDescendingCompareFunction,
    }

    const wrapper = (p) => {
        {
            localStorage.setItem('cartItemQuantity', p.quantity);
            window.location.href =
                `http://localhost:3000/product/` + p.modelNo + "/" + p.seller;
        }
    };
    const arrayDataMap = (searchArray) => {
        return products
            .filter((p) => {
                return p.name.toLowerCase().includes(searchArray.toLowerCase());
            })
            .sort(compareFunctionMap[sortBy])
            .map((p, index) => {
                if (p.quantity != 0) {
                    return (
                        <Box
                            key={index}
                            onClick={() => {
                                wrapper(p);
                            }}
                        >
                            <BuyerCard
                                image={p.image}
                                sellerName={p.sellerName}
                                name={p.name}
                                price={p.price}
                                quantity={p.quantity}
                                description={p.description}
                                modelNo={p.modelNo}
                                productTrack={productTrack}
                                sellerAddress={p.seller}
                            />
                        </Box>
                    );
                } else {
                    return (
                        <Box
                            key={index}
                            onClick={() => {
                                wrapper(p);
                            }}
                        >
                        <BuyerCard
                            key={index}
                            image={p.image}
                            sellerName={p.sellerName}
                            name={p.name}
                            price={p.price}
                            quantity={"Out of Stock"}
                            description={p.description}
                            modelNo={p.modelNo}
                            productTrack={productTrack}
                            sellerAddress={p.seller}
                        />
                        </Box>
                    );
                }
            });
    };
    useEffect(() => {
        getProductInfo();
        console.log(searchArray);
    }, []);

    useEffect(() => {
    }, [searchArray])
    

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
                <Box mt="6" ms="3" fontWeight="bold" fontSize="xs">
                    sort by:
                </Box>
                <Select
                    placeholder="FEATURED"
                    w="10vw"
                    h="5vh"
                    bg="white"
                    mt="4"
                    ms="2"
                    fontWeight="thinner"
                    color="gray"
                    fontSize="xs"
                    borderRadius={0}
                    onChange={(e) => {
                        setsortBy(e.target.value);
                    }}
                >
                    <option value="name-ascending">ALPHABETICALLY, A-Z</option>
                    <option value="name-descending">ALPHABETICALLY, Z-A</option>
                    <option value="price-ascending">PRICE, LOW TO HIGH</option>
                    <option value="price-descending">PRICE, HIGH TO LOW</option>
                </Select>
            </Flex>
            <Flex justifyContent="center" ps="4" py="4">
                <Text fontSize="3xl" fontWeight="medium" color="blue.600">
                    Featured Products
                </Text>
            </Flex>
            <Box ps="50px">
                <SimpleGrid columns={4} p="5" pb="50vh">
                    {arrayDataMap(searchArray)}
                </SimpleGrid>
            </Box>
        </Box>
    );
}
