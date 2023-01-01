import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import lcd from "../images/lcd-image.jpg";
const ProductDisplay = () => {
    const [accountAddress, setAccountAddress] = useState("");
    const [modelNo,  setModelNo] = useState("");
    const [products, setProducts] = useState("");
    const [productName, setproductName] = useState("");
    const [image, setimage] = useState("");
    const [price, setprice] = useState(0);
    const getValuesOfModel = async()=>{
        const modelNo = localStorage.getItem("modelNo");
        setModelNo(modelNo);
        const value = await axios.get(
            "http://localhost:8000/Product/getProductByModelNo", //TODO customize this to seller and buyer
            {
                params: {
                    modelNo:modelNo,
                }
            }
        );
        setimage(value.data.image);
        setproductName(value.data.productName);
        setprice(value.data.price);
    }

    const request = async () => {
        console.log(accountAddress);
        console.log("Products : ", products);
        console.log("Model No : ", modelNo);



        await axios.post(
            "http://localhost:8000/create-checkout-session", //TODO customize this to seller and buyer
            {
                products: products,
                productModelNo:modelNo,
                address:accountAddress
            }


        );
    };
    useEffect(() => {
        getValuesOfModel();
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        const products = localStorage.getItem("noOfProducts");
        setProducts(products);
        setAccountAddress(items);
        console.log(accountAddress);
        console.log(
            "chonki",
            JSON.parse(localStorage.getItem("UserAddress"))
        );
        console.log("Model No : ", modelNo);
        console.log("Products : ", products);
    }, []);

    return (
        <section>
            <Box align="center" mt="5vh" p="4">
            <Box borderWidth="1px" w="30%" p="4" borderRadius={8} bg="alphaBlack.50" boxShadow="lg">
            <Box className="product" w="100%" h="100%" align="center" mt="5">
                <Image
                    src={`http://localhost:8000${image}`}
                    w="30vw"
                    alt="LCD Image"
                />
                <div className="description">
                    <Flex justifyContent="center" my="4">
                        <Text fontWeight="bold" fontSize="md" me="4">{productName}</Text>
                        <Text fontWeight="bold" fontSize="md">${price}</Text>
                    </Flex>
                </div>
            </Box>
            <form
                action="http://localhost:8000/create-checkout-session"
                method="POST"
            >
                <input type="hidden" name="price" value={price} />
                <input
                    type="hidden"
                    name="products"
                    value={localStorage.getItem("noOfProducts")}
                />
                <input 
                    type="hidden"
                    name="modelNo"
                    value={localStorage.getItem("modelNo")}
                />
                <input
                    type="hidden"
                    name="address"
                    value={JSON.parse(localStorage.getItem("UserAddress"))}
                />
                <input
                    type="hidden"
                    name="manufacturerAddress"
                    value={JSON.parse(localStorage.getItem("ManufacturerAddress"))}
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
