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
function App() {
    const [owner, setowner] = useState(0);
    const setAccountOwner = (address) => {
        setowner(address);
        localStorage.setItem("UserAddress", JSON.stringify(address));
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
                    <Route path="/pendingRequests" element={<PendingRequests/>}/>
                    <Route path="/authenticSellers" element={<AuthenticSellers/>}/>
                    <Route path="/pendingVerificationRequests" element={<PendingVerificationRequests/>}/>
                    <Route path="/stripePayment" element={<TestStripe/>}/>
                    <Route path="/shipment" element={<ShipmentPage/>}/>
                    <Route path="/buyer" element={<BuyerHomepage />} />
                    <Route path="/manufacturerProductPage" element={<ManufacturerProductPage />} />
                    <Route path="/manufacturerAddProduct" element={<ManufacturerAddProduct />} />
                    <Route path="/paymentSuccessfull/:success/:products/:price/:address/:productModelNo" element={<PaymentSuccessfull />} />
                    {/* TO DO AHMED ZIA product name add also */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
