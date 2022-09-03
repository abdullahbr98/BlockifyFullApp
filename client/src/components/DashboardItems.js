import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Link } from "@chakra-ui/react";
import axios from "axios";

export default function DashboardItems({ setProductsFunc }) {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const getPendingRequests = async () => {
    const result = await axios.get(
      "http://localhost:8000/Seller/productRequest"
    );
    const data = result.data;
    const count = data.length;
    console.log("Count : ", count);
    setPendingRequests(data);
    console.log(data);
    localStorage.setItem("pendingRequests", JSON.stringify(data));
  };
  useEffect(() => {
    getPendingRequests();
  }, []);

  return (
    <>
      <Box px={120} h={"80vh"}>
        <Flex justifyContent="space-between">
          <Box
            opacity="0.8"
            color="white"
            bg="green.300"
            w={"40vw"}
            h={"35vh"}
            pt={3}
            borderRadius={14}
          >
            <Text fontSize="3xl" align="center">
              Pending Product Requests
            </Text>
            <Flex justifyContent="space-between">
              <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>
                {pendingRequestsCount}
              </Text>
              <Button
                color="black"
                borderColor="black"
                bg="white"
                borderRadius={18}
                variant="outline"
                fontSize="sm"
                mt={"12vh"}
                me={5}
              >
                <Link href="/pendingRequests">Approve Requests</Link>
              </Button>
            </Flex>
          </Box>
          <Box
            opacity="0.8"
            color="white"
            bg="purple.300"
            w={"40vw"}
            h={"35vh"}
            pt={3}
            borderRadius={14}
          >
            <Text fontSize="3xl" align="center">
              Total Authenticated Sellers
            </Text>
            <Flex justifyContent="space-between">
              <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>
                10
              </Text>
              <Button
                color="black"
                borderColor="black"
                bg="white"
                borderRadius={18}
                variant="outline"
                fontSize="sm"
                mt={"12vh"}
                me={5}
              >
                View Sellers List
              </Button>
            </Flex>
          </Box>
        </Flex>
        <Flex>
          <Box
            mt={10}
            opacity="0.8"
            color="white"
            bg="blue.400"
            w={"25vw"}
            h={"35vh"}
            pt={3}
            borderRadius={14}
          >
            <Text fontSize="2xl" align="center">
              Products in inventory
            </Text>
            <Flex justifyContent="space-between">
              <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>
                10
              </Text>
              <Button
                color="black"
                borderColor="black"
                bg="white"
                borderRadius={18}
                variant="outline"
                fontSize="sm"
                mt={"12vh"}
                me={5}
              >
                View Products
              </Button>
            </Flex>
          </Box>
          <Box
            ms={"4vw"}
            mt={10}
            opacity="0.8"
            color="white"
            bg="red.300"
            w={"25vw"}
            h={"35vh"}
            pt={3}
            borderRadius={14}
          >
            <Text fontSize="2xl" align="center">
              {" "}
              Sellers shop location
            </Text>
            <Flex justifyContent="space-between">
              <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>
                10
              </Text>
              <Button
                color="black"
                borderColor="black"
                bg="white"
                borderRadius={18}
                variant="outline"
                fontSize="sm"
                mt={"12vh"}
                me={5}
              >
                View Cordinates
              </Button>
            </Flex>
          </Box>
          <Box
            ms={"4vw"}
            mt={10}
            opacity="0.8"
            color="white"
            bg="black"
            w={"25vw"}
            h={"35vh"}
            pt={3}
            borderRadius={14}
          >
            <Text fontSize="2xl" align="center">
              Approved Sellers History
            </Text>
            <Flex justifyContent="space-between">
              <Text fontSize="6xl" mt={"6vh"} ms={"5vw"}>
                10
              </Text>
              <Button
                color="black"
                borderColor="black"
                bg="white"
                borderRadius={18}
                variant="outline"
                fontSize="sm"
                mt={"12vh"}
                me={5}
              >
                View History
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
