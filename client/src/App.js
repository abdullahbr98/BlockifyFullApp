import "./App.css";
import LandingPage from "./pages/LandingPage";
import { useState,useEffect } from "react";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import MetamaskConnect from "./pages/MetamaskConnect";
import ManufacturerHomeScreen from "./pages/ManufacturerHomeScreen";
import SellerHomePage from "./pages/SellerHomePage"
import ManufacturerProtectedRoutes from "./components/ManufacturerProtectedRoutes"
import PendingRequests from "./pages/PendingRequests"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
                    <Route path="/seller" element={<SellerHomePage/>}/>
                    <Route path="/pendingRequests" element={<PendingRequests/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
