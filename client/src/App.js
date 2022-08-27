import "./App.css";
import LandingPage from "./pages/LandingPage";
import { useState,useEffect } from "react";
import SignUpPage from "./pages/SignUpPage";
import MetamaskConnect from "./pages/MetamaskConnect";
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
                </Routes>
            </Router>
        </>
    );
}

export default App;
