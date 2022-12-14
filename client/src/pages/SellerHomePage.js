import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SellerLeftMenu from "../components/SellerLeftMenu";
import SellerHomeItems from "../components/SellerHomeItems";
import SellerProfileInfo from "../components/SellerProfileInfo"
import SellerShopInfo from "../components/SellerShopInfo"
import SellerProductReq from "../components/SellerProductReq"
import SellerPurchaseReq from "../components/SellerPurchaseReq"
import SellerAuthenticationStatus from "../components/SellerAuthenticationStatus"
import {
    Box,
    Flex,
} from "@chakra-ui/react";
export default function SellerHomePage() {
    const [displayHome, setdisplayHome] = useState(1);
    const [profileInfo, setprofileInfo] = useState(0);
    const [shopInfo, setshopInfo] = useState(0);
    const [productReq, setproductReq] = useState(0);
    const [purchaseReq, setpurchaseReq] = useState(0);
    const [sellerAuthenticate, setsellerAuthenticate] = useState(0);
    const displayHomeFunc = ()=>{
        setdisplayHome(1);
        setprofileInfo(0);
        setshopInfo(0);
        setproductReq(0);
        setpurchaseReq(0);
        setsellerAuthenticate(0);
    }
    const profileInfoFunc = ()=>{
        setdisplayHome(0);
        setprofileInfo(1);
        setshopInfo(0);
        setproductReq(0);
        setpurchaseReq(0);
        setsellerAuthenticate(0);
    }
    const shopInfoFunc = ()=>{
        setdisplayHome(0);
        setprofileInfo(0);
        setshopInfo(1);
        setproductReq(0);
        setpurchaseReq(0);
        setsellerAuthenticate(0);
    }
    const productReqFunc = () =>{
        setdisplayHome(0);
        setprofileInfo(0);
        setshopInfo(0);
        setproductReq(1);
        setpurchaseReq(0);
        setsellerAuthenticate(0);
    }
    const purchaseReqFunc = () =>{
        setdisplayHome(0);
        setprofileInfo(0);
        setshopInfo(0);
        setproductReq(0);
        setpurchaseReq(1);
        setsellerAuthenticate(0);
    }
    const sellerAuthenticateFunc = () =>{
        setdisplayHome(0);
        setprofileInfo(0);
        setshopInfo(0);
        setproductReq(0);
        setpurchaseReq(0);
        setsellerAuthenticate(1);
    }
    return (
        <Box>
            <Box className="App" mx={100} mt={25}>
                <Navbar guestAccess={false} heading={"Seller Home Screen"} />
            </Box>
            <Flex>
                <SellerLeftMenu displayHomeFunc={displayHomeFunc} profileInfoFunc={profileInfoFunc} shopInfoFunc={shopInfoFunc} productReqFunc={productReqFunc} purchaseReqFunc={purchaseReqFunc} sellerAuthenticateFunc = {sellerAuthenticateFunc}/>
                {displayHome === 1 ? (<SellerHomeItems displayHome={displayHome}/>): <Box display="none"></Box>}
                {profileInfo === 1 ?(<SellerProfileInfo profileInfoFunc={profileInfoFunc}/>):<Box display="none"></Box> }
                {shopInfo === 1 ?(<SellerShopInfo shopInfo={shopInfo}/>):<Box display="none"></Box> }
                {productReq === 1 ?(<SellerProductReq productReq={productReq}/>):<Box display="none"></Box> }
                {purchaseReq === 1 ?(<SellerPurchaseReq purchaseReq={purchaseReq}/>):<Box display="none"></Box> }
                {sellerAuthenticate === 1 ?(<SellerAuthenticationStatus sellerAuthenticate={sellerAuthenticate}/>):<Box display="none"></Box> }
            </Flex>
        </Box>
    );
}
