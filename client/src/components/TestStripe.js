import React, { useState, useEffect } from "react";
import axios from "axios";
const ProductDisplay = () => {
    const [accountAddress, setAccountAddress] = useState("");

    const request = async () => {
        console.log(accountAddress);
        const products = localStorage.getItem("noOfProducts");
        console.log(products);
        await axios.post(
            "http://localhost:8000/create-checkout-session", //TODO customize this to seller and buyer
            {
                products: products,
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
            <div className="product">
                <img
                    src="https://i.imgur.com/EHyR2nP.png"
                    alt="The cover of Stubborn Attachments"
                />
                <div className="description">
                    <h3>Stubborn Attachments</h3>
                    <h5>$20.00</h5>
                </div>
            </div>
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
                <button type="submit">Checkout</button>
            </form>
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
