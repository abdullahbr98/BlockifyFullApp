import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import lcd from "../images/lcd-image.jpg";
const ProductDisplay = () => {
    const [accountAddress, setAccountAddress] = useState("");

    const request = async () => {
        console.log(accountAddress);
        const products = localStorage.getItem("noOfProducts");
        const modelNo = localStorage.getItem("modelNo");
        console.log(products);
        await axios.post(
            "http://localhost:8000/create-checkout-session", //TODO customize this to seller and buyer
            {
                products: products,
                productModelNo:modelNo,
            }


        );
    };
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        setAccountAddress(items[0]);
        console.log(accountAddress);
        console.log(
            "chonki",
            JSON.parse(localStorage.getItem("UserAddress"))[0]
        );
    }, []);

    return (
        <section>
            <Box align="center" mt="5vh" p="4">
            <Box borderWidth="1px" w="30%" p="4" borderRadius={8} bg="alphaBlack.50" boxShadow="lg">
            <Box className="product" w="100%" h="100%" align="center" mt="5">
                <Image
                    src={lcd}
                    w="30vw"
                    alt="LCD Image"
                />
                <div className="description">
                    <Flex justifyContent="center" my="4">
                        <Text fontWeight="bold" fontSize="md" me="4">Samsung LCD</Text>
                        <Text fontWeight="bold" fontSize="md">$500.00</Text>
                    </Flex>
                </div>
            </Box>
            <form
                action="http://localhost:8000/create-checkout-session"
                method="POST"
            >
                <input type="hidden" name="price" value={69} />
                <input
                    type="hidden"
                    name="products"
                    value={localStorage.getItem("noOfProducts")}
                />
                <input
                    type="hidden"
                    name="address"
                    value={JSON.parse(localStorage.getItem("UserAddress"))[0]}
                />
                <Box align="center">
                    <Button type="submit" color="black" bg="green.200" _hover={{"backgroundColor":"black", "color":"white"}}>Proceed To Checkout</Button>
                </Box>
            </form>
            </Box>
            </Box>
        </section>
    );
};

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function TestStripe() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return message ? <Message message={message} /> : <ProductDisplay />;
}
