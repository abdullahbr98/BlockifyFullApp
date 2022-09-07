import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SellerLeftMenu from "../components/SellerLeftMenu";
import SellerHomeItems from "../components/SellerHomeItems";
import SellerProfileInfo from "../components/SellerProfileInfo"
import SellerShopInfo from "../components/SellerShopInfo"
import SellerProductReq from "../components/SellerProductReq"
import {
    Box,
    Flex,
    Text,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    useDisclosure,
} from "@chakra-ui/react";
export default function SellerHomePage() {
    const [displayHome, setdisplayHome] = useState(1);
    const [profileInfo, setprofileInfo] = useState(0);
    const [shopInfo, setshopInfo] = useState(0);
    const [productReq, setproductReq] = useState(0);
    const displayHomeFunc = ()=>{
        setdisplayHome(1);
        setprofileInfo(0);
        setshopInfo(0);
        setproductReq(0);
    }
    const profileInfoFunc = ()=>{
        setdisplayHome(0);
        setprofileInfo(1);
        setshopInfo(0);
        setproductReq(0);
    }
    const shopInfoFunc = ()=>{
        setdisplayHome(0);
        setprofileInfo(0);
        setshopInfo(1);
        setproductReq(0);
    }
    const productReqFunc = () =>{
        setdisplayHome(0);
        setprofileInfo(0);
        setshopInfo(0);
        setproductReq(1);
    }
    return (
        <Box>
            <Box className="App" mx={100} mt={25}>
                <Navbar guestAccess={false} heading={"Seller Home Screen"} />
            </Box>
            <Flex>
                <SellerLeftMenu displayHomeFunc={displayHomeFunc} profileInfoFunc={profileInfoFunc} shopInfoFunc={shopInfoFunc} productReqFunc={productReqFunc}/>
                {displayHome === 1 ? (<SellerHomeItems displayHome={displayHome}/>): <Box display="none"></Box>}
                {profileInfo === 1 ?(<SellerProfileInfo profileInfoFunc={profileInfoFunc}/>):<Box display="none"></Box> }
                {shopInfo === 1 ?(<SellerShopInfo shopInfo={shopInfo}/>):<Box display="none"></Box> }
                {productReq === 1 ?(<SellerProductReq productReq={productReq}/>):<Box display="none"></Box> }
            </Flex>
        </Box>
    );
}
