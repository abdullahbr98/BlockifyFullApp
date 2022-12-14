import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PaymentSuccess from "../images/success.png";
import { Box, Flex, Text, Button, Icon, Link, Image } from "@chakra-ui/react";
export default function CheckoutComplete() {
    const modelNoOriginal = localStorage.getItem("modelNo");
    console.log("modelNoOriginal:",modelNoOriginal);
    const { success, products, price, buyerAddress,productModelNo, sellerAddress} = useParams();
    console.log("productModel",productModelNo);
    const handleButton = async () => {
        const trasaction = await axios.post("http://localhost:8000/Seller/sendProducts", {
            products: products,
            price: price,
            buyerAddress: buyerAddress,
            productModelNo:modelNoOriginal,
            sellerAddress:sellerAddress
        });


        const buyer = await axios.get("http://localhost:8000/Buyer/getBuyerFromAddress", {
            params: {
                accountAddress : buyerAddress
            }
        });

        console.log(buyer);

        const username = buyer.username;
        // Update Manufacturer Inventory

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        const result = await axios.post("http://localhost:8000/Order/placeOrder",{
            items : products,
            orderAmount : price,
            orderDate :today,
            paymentMethod : "Stripe",
            paymentStatus : "paid",
            orderStatus : "placed",
            buyerAddress : buyerAddress,
            sellerAddress : sellerAddress
        });

        console.log("result is here:",result);

        // // Add Product to Seller Db
        // axios.post("http://localhost:8000/Seller/addProductInSeller",{
        //     accountAddress:address,
        //     modelNumber:modelNoOriginal,
        //     quantity:products
        // });


        // //
        // axios.post("http://localhost:8000/Seller/deletePurchaseRequest", {
        //     sellerAddress: address,
        //     products: products,
        // });
        
        window.location.href = "http://localhost:3000/Buyer/" + localStorage.getItem("usernameOfBuyer");
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
                        <Text>{sellerAddress}</Text>
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
