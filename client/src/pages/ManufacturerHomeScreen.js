import React from 'react'
import {useParams} from 'react-router-dom';
import Navbar from "../components/Navbar";
import {
  Box
} from "@chakra-ui/react";
export default function ManufacturerHomeScreen() {
    const {id} = useParams();
  return (
    <>
            <Box className="App" ms={100} me={100} mt={25}>
                <Navbar guestAccess={false}/>
            </Box>
      </>
  )
}
