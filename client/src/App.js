// Description : Defines Routes and Entry Point for the Application
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { useState,useEffect } from "react";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import MetamaskConnect from "./pages/MetamaskConnect";
import PaymentSuccessfull from "./components/PaymentSuccessfull";
import ManufacturerHomeScreen from "./pages/ManufacturerHomeScreen";
import SellerHomePage from "./pages/SellerHomePage"
import ManufacturerProtectedRoutes from "./components/ManufacturerProtectedRoutes"
import PendingRequests from "./pages/PendingRequests"
import AuthenticSellers from "./pages/AuthenticSellers"
import PendingVerificationRequests from "./components/PendingVerificationRequests"
import ShipmentPage from "./pages/ShipmentPage"
import BuyerHomepage from "./pages/BuyerHomepage"
import ManufacturerProductPage from "./pages/ManufacturerProductPage"
import ManufacturerAddProduct from "./pages/ManufacturerAddProduct"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TestStripe from "./components/TestStripe"
import ManufacturerTransactions from './components/ManufacturerTransactions'
import SingleProductPage from "./components/SingleProductPage"
import BuyerCartPage from "./components/BuyerCartPage"
import Orderspage from "./pages/Orderspage"
import StripeBuyer from "./components/StripeBuyer"
import CheckoutComplete from "./components/CheckoutComplete";
// import BuyerCart from "./components/BuyerCart"

function App() {
    const [owner, setowner] = useState(0);
    const setAccountOwner = (address) => {
        if (address === undefined) {
            setowner("");
            localStorage.setItem("UserAddress", JSON.stringify(""));
        }
        else
        {
            setowner(address);
            localStorage.setItem("UserAddress", JSON.stringify(address));
        }
        console.log(address);
    };
    
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            owner === 0 ? (
                                <MetamaskConnect
                                    initAccountOwner={setAccountOwner}
                                />
                            ) : (
                                <LandingPage />
                            )
                        }
                    />
                    <Route path="/register" element={<SignUpPage />} />
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/manufacturer/:id" element={<ManufacturerHomeScreen />} />
                    <Route path="/seller/:id" element={<SellerHomePage/>}/>
                    <Route path="/buyer/:id" element={<BuyerHomepage />} />
                    <Route path="/pendingRequests" element={<PendingRequests/>}/>
                    <Route path="/authenticSellers" element={<AuthenticSellers/>}/>
                    <Route path="/manufacturerTransactions" element={<ManufacturerTransactions />}/>
                    <Route path="/pendingVerificationRequests" element={<PendingVerificationRequests/>}/>
                    <Route path="/stripePayment" element={<TestStripe/>}/>
                    <Route path="/stripePaymentBuyer" element={<StripeBuyer/>}/>
                    <Route path="/shipment" element={<ShipmentPage/>}/>
                    <Route path="/manufacturerProductPage" element={<ManufacturerProductPage />} />
                    <Route path="/manufacturerAddProduct" element={<ManufacturerAddProduct />} />
                    <Route path="/paymentSuccessfull/:success/:products/:price/:address/:productModelNo" element={<PaymentSuccessfull />} />
                    <Route path="/CheckoutComplete/:success/:products/:price/:buyerAddress/:productModelNo/:sellerAddress" element={<CheckoutComplete />} />
                    <Route path="/product/:id/:seller" element={<SingleProductPage />} />
                    <Route path="/cart" element={<BuyerCartPage />} />
                    <Route path="/orders" element={<Orderspage />} />
                    {/* <Route path="/cart" element={<BuyerCart />} /> */}

                    {/* TO DO AHMED ZIA product name add also */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
