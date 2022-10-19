import React from "react";
import ProductGrid from "../components/ProductGrid";
import { Box, Flex, Text, Button, SimpleGrid, Icon } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { IoIosAddCircle } from "react-icons/io";
import Sidebar from "../components/ManufacturerSideBar";
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
export default function ManufacturerProductPage() {
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
                            <ProductGrid array={array} />
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
                                    window.location.href = '/ManufacturerAddProduct';
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
