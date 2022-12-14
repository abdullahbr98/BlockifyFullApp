import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PaymentSuccess from "../images/success.png";
import { Box, Flex, Text, Button, Icon, Link, Image } from "@chakra-ui/react";
export default function PaymentSuccessfull() {
    const modelNoOriginal = localStorage.getItem("modelNo");
    console.log("modelNoOriginal:",modelNoOriginal);
    const { success, products, price, address,productModelNo,manufacturerAddress } = useParams();
    console.log("productModel",productModelNo);
    const handleButton = async () => {
        axios.post("http://localhost:8000/ManufacturerSM/sendProducts", {
            products: products,
            price: price,
            address: address,
            productModelNo:modelNoOriginal,
            manufacturerAddress:manufacturerAddress
        });
        // Update Manufacturer Inventory

        axios.post("http://localhost:8000/Manufacturer/updateProductQuantity",{
            accountAddress:address,
            modelNumber:modelNoOriginal,
            quantity:products
        });


        // Add Product to Seller Db
        axios.post("http://localhost:8000/Seller/addProductInSeller",{
            accountAddress:address,
            modelNumber:modelNoOriginal,
            quantity:products
        });


        //
        axios.post("http://localhost:8000/Seller/deletePurchaseRequest", {
            sellerAddress: address,
            products: products,
        });
        window.location.href = "http://localhost:3000/Seller/seller";
    };
    return (
        <>
            <Box align="center">
                <Box w="35vw" py={8} px={5} mt="5vh" borderWidth="1px" boxShadow="xl" borderRadius={6}>
                    <Text color="green.300"  fontSize="3xl">
                        Payment successfull!
                    </Text>
                    <Box>
                    <Image
                        src={PaymentSuccess}
                        alt="successfull png"
                        w="90px"
                        my={10}
                    />
                    </Box>
                    <Flex my="4" justifyContent="space-between" ps="5">
                        <Text fontSize="md" fontWeight="bold" me="3">Payment Type:</Text>
                        <Text>Stripe</Text>
                    </Flex>
                    <Flex my="4" justifyContent="space-between" ps="5">
                        <Text fontSize="md" fontWeight="bold">Address:</Text>
                        <Text>{address}</Text>
                    </Flex>
                    <Flex my="4" justifyContent="space-between" ps="5">
                        <Text fontSize="md" fontWeight="bold" me="3">Products Transacted:</Text>
                        <Text>{products}</Text>
                    </Flex>
                    <Button onClick={handleButton} mt="3" variant="outline" bg="blue.400" _hover={{"backgroundColor":'green.200'}}color="white">Complete Transaction</Button>
                </Box>
            </Box>
        </>
    );
}