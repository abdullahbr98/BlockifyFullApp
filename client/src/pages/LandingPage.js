import React from 'react'
import Navbar from '../components/Navbar';
import Slogan from '../components/Slogan';
import Section from '../components/Section';
import Faqs from '../components/Faqs'
import {
  Box
} from "@chakra-ui/react";
export default function LandingPage() {
    return (
      <>
            <Box className="App" ms={100} me={100} mt={25}>
                <Navbar />
                <Slogan />
                <Section />
                <Faqs/>
            </Box>
      </>
    )
}
