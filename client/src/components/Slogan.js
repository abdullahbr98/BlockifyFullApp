import React from "react";
import facAuth from "../images/undraw_two_factor_authentication_namy.svg"
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import {
  MinusIcon,
} from "@chakra-ui/icons";
export default function Slogan() {
  return (
    <Flex mt="5">
      <Box align="left" pt={50}>
        <Text fontSize="6xl" fontWeight="extrabold" mb={5}>
          Verify. Trust. <br />  Purchase.
        </Text>
        <Text fontSize="3xl" fontWeight="bold" mb={5} color="green.400">
        <MinusIcon color="blackAlpha.500"/> 
          {' '}Making possible.
        </Text>
        <Text fontSize="2xl" mb={5} color="blackAlpha.500" fontWeight="thin">
          Buy geniune products from <br/> verified sellers.
        </Text>
        <Button bg="blue.500" color="white" variant="solid" mb={10}>
          Get Started
        </Button>
      </Box>
      <Box align="right" ms="auto">
      <Image boxSize='600px' src={facAuth} alt='logo' />
      </Box>
    </Flex>
  );
}
