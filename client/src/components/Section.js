import React from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Divider
} from "@chakra-ui/react";
import navigation from "../images/navigation.svg"
import services from "../images/services.svg"
import cart from "../images/addToCart.svg"
import seller from "../images/verifySeller.svg"
export default function Section() {
  return (
    <>
      <Flex>
        <Box flex='2'>
          <Flex>
            <Image boxSize='150px' src={services} alt='logo' />
            <Text fontSize="xl" fontWeight="bold" align={"left"} mt={4} ms={10} borderBottom="2px" borderColor="gray.400" color={"gray.700"}>
              Services We <br />  Provide.
            </Text>
          </Flex>
        </Box>
        <Box flex='1'>
          <Flex direction='column'>
            <Image boxSize='120px' src={cart} alt='logo' ms={4} />
            <Text fontSize="md" color="blackAlpha.500" fontWeight="normal" align="left" m={3} borderRight="2px" borderColor="gray.200">
              Search for geniune <br /> Products.
            </Text>
          </Flex>
        </Box>
        <Box flex='1'>
          <Flex direction='column'>
            <Image boxSize='120px' src={seller} alt='logo' ms={4} />
            <Text fontSize="md" color="blackAlpha.500" fontWeight="normal" align="left" m={3} borderRight="2px" borderColor="gray.200">
              Verified Sellers <br />on the go.
            </Text>
          </Flex>
        </Box>
        <Box flex='1'>
          <Flex direction='column'>
            <Image boxSize='120px' src={navigation} alt='logo' ms={4} />
            <Text fontSize="md" align="left" color="blackAlpha.500" fontWeight="thin" m={3}>
              Navigate Sellers <br /> Shop Precisely.
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Divider mt={4} mb={4}/>
    </>
  )
}
