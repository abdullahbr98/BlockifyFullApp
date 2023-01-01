import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import lcdImage from "../images/lcd-image.jpg";
import SellerProductsMaps from "../components/SellerProductsMaps";
import SellerShopInfo from "../components/SellerShopInfo";
import BuyerTransaction from "../components/BuyerTransaction";
import {
    Box,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    useDisclosure,
    ModalBody,
    ModalCloseButton,
    SimpleGrid,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Text,
    Image,
    Button,
    Link,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import BuyerNavbar from "../components/BuyerNavbar";
import BuyerFooter from "../components/BuyerFooter";
export default function SingleProductPage() {
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [productInfo, setproductInfo] = useState({});
    const [sellerInformationData, setsellerInformationData] = useState(null);
    ///getProductByModelNo
    const { id } = useParams();
    const { seller } = useParams();
    const goToCart = (product) => {
        console.log("here is:", product);
        localStorage.setItem("cartItems", JSON.stringify(product));
        localStorage.setItem("productSellerAddress", JSON.stringify(seller));
        localStorage.setItem("modelNo", id);
        window.location.href = `http://localhost:3000/cart/`;
        console.log("modelNo", id);
        console.log("seller", seller);
    };

    const getSellerInfoApi = async () => {
        const sellerInformation = await axios.get(
            "http://localhost:8000/Seller/getSeller",
            {
                params: {
                    sellerAddress: seller,
                },
            }
        );
        setsellerInformationData(sellerInformation.data);
        console.log("seller ki information", sellerInformation);
    };

    const getProductInfo = async () => {
        const product = await axios.get(
            "http://localhost:8000/Product/getProductByModelNo",
            {
                params: {
                    modelNo: id,
                },
            }
        );
        console.log("value shown in single product page:", product.data);
        setproductInfo(product.data);
    };
    useEffect(() => {
        getProductInfo();
        getSellerInfoApi();
    }, []);

    return (
        <>
            <Flex>
                <Modal isOpen={isOpen} onClose={onClose} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Transaction</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* <BuyerTransaction /> */}
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
            <Box bg="blackAlpha.50" w="100vw">
                <BuyerNavbar />
                <SimpleGrid columns={2} h="80vh" w="100vw" spacing="5">
                    <Box align="center">
                        <Image
                            src={`http://localhost:8000${productInfo.image}`}
                            mt="5"
                            ms="2"
                            borderRadius="4"
                            w="50%"
                        ></Image>
                    </Box>
                    <Box textAlign="left" mt="5">
                        <Text fontSize="4xl" ps="2">
                            {productInfo.productName}
                        </Text>
                        <Text fontSize="2xl" ps="2" color="gray.500">
                            ${productInfo.price}.00
                        </Text>
                        {localStorage.getItem("cartItemQuantity") != 0 ? (
                            <Button
                                m="3"
                                w="15rem"
                                borderRadius={4}
                                colorScheme="facebook"
                                onClick={() => {
                                    goToCart(productInfo);
                                    localStorage.setItem(
                                        "imageUrl",
                                        productInfo.image
                                    );
                                }}
                            >
                                Add to Cart
                            </Button>
                        ) : (
                            <Text fontSize="lg" color="red">
                                Out Of Stock
                            </Text>
                        )}
                        <Text
                            fontSize="md"
                            pe={12}
                            fontWeight="medium"
                            color="gray.500"
                            mt="4"
                        >
                            {productInfo.description}
                        </Text>
                        <Text
                            fontSize="md"
                            pe={12}
                            fontWeight="bold"
                            color="gray.500"
                            mt="4"
                        >
                            *Due to restrictions the item is only Available in
                            Lahore, Pakistan
                        </Text>
                    </Box>
                </SimpleGrid>
                <Box mx="12" mb="12">
                    <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton _hover={{ color: "blue" }}>
                                    <Box
                                        flex="1"
                                        textAlign="left"
                                        fontSize="3xl"
                                    >
                                        Specification
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <TableContainer>
                                    <Table variant="striped" colorScheme="blue">
                                        <Thead>
                                            <Tr>
                                                <Th>Property</Th>
                                                <Th>Values</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {/* mapping here to show data */}
                                            <Tr>
                                                <Td>Brand</Td>
                                                <Td>{productInfo.Brand}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Color</Td>
                                                <Td>{productInfo.color}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Height</Td>
                                                <Td>{productInfo.height}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Width</Td>
                                                <Td>{productInfo.width}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Display Type</Td>
                                                <Td>
                                                    {productInfo.displayType}
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Resolution</Td>
                                                <Td>
                                                    {productInfo.Resolution}
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>HDR</Td>
                                                <Td>{productInfo.HDR}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Refresh Rate</Td>
                                                <Td>
                                                    {productInfo.refreshRate} Hz
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Smart capability</Td>
                                                <Td>
                                                    {productInfo.smartCapable}
                                                </Td>
                                            </Tr>

                                            <Tr>
                                                <Td>
                                                    Featured Streaming Services
                                                </Td>
                                                <Td>
                                                    {
                                                        productInfo.featuredStreamingServices
                                                    }
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Screen mirroring</Td>
                                                <Td>
                                                    {
                                                        productInfo.screenMirroring
                                                    }
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>No of HDMI Inputs</Td>
                                                <Td>
                                                    {productInfo.hdmiInputs}
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>No of USB Inputs</Td>
                                                <Td>{productInfo.usbInputs}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Network Compatibility</Td>
                                                <Td>
                                                    {
                                                        productInfo.networkCompatibility
                                                    }
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>No of Speakers</Td>
                                                <Td>{productInfo.speakers}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Speakers Type</Td>
                                                <Td>
                                                    {productInfo.speakerType}
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Warranty</Td>
                                                <Td>{productInfo.Warranty}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Total Time of Warranty</Td>
                                                <Td>
                                                    {productInfo.WarrantyTime}
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton _hover={{ color: "blue" }}>
                                    <Box
                                        flex="1"
                                        textAlign="left"
                                        fontSize="3xl"
                                    >
                                        From The Manufacturer
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                There is no manufacturer content to show for
                                this product. Explore the Specs sections to
                                learn more about this product details.
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton _hover={{ color: "blue" }}>
                                    <Box
                                        flex="1"
                                        textAlign="left"
                                        fontSize="3xl"
                                    >
                                        Seller Information
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Flex justifyContent="center">
                                    <Box>
                                        {sellerInformationData ? (
                                            <SimpleGrid columns={2}>
                                                <Box>
                                                    <Box w="100%" p="3">
                                                        <Text
                                                            fontWeight="bold"
                                                            fontSize="lg"
                                                        >
                                                            Seller Name:{" "}
                                                            {sellerInformationData.firstName +
                                                                " " +
                                                                sellerInformationData.lastName}
                                                        </Text>
                                                    </Box>
                                                    {sellerInformationData.shopName ? (
                                                        <Box w="100%" p="3">
                                                            <Text
                                                                fontWeight="bold"
                                                                fontSize="lg"
                                                            >
                                                                Shop Name:{" "}
                                                                {
                                                                    sellerInformationData.shopName
                                                                }
                                                            </Text>
                                                        </Box>
                                                    ) : (
                                                        <Box></Box>
                                                    )}
                                                    {sellerInformationData.shopAddress ? (
                                                        <Box w="100%" p="3">
                                                            <Text
                                                                fontWeight="bold"
                                                                fontSize="lg"
                                                            >
                                                                Shop Address:{" "}
                                                                {
                                                                    sellerInformationData.shopAddress
                                                                }
                                                            </Text>
                                                        </Box>
                                                    ) : (
                                                        <Box></Box>
                                                    )}
                                                    <Box>
                                                        <Text
                                                            fontWeight="bold"
                                                            p="3"
                                                            fontSize="lg"
                                                        >
                                                            Phone Number:{" "}
                                                            {
                                                                sellerInformationData.phoneNumber
                                                            }
                                                        </Text>
                                                    </Box>
                                                    {sellerInformationData.cordinates ? (
                                                        <Box>
                                                            <Text
                                                                fontWeight="bold"
                                                                p="3"
                                                                fontSize="lg"
                                                            >
                                                                Seller Shop
                                                                Cordinates:{" "}
                                                                {
                                                                    sellerInformationData.cordinates
                                                                }
                                                            </Text>
                                                        </Box>
                                                    ) : (
                                                        <Box></Box>
                                                    )}
                                                    <Box>
                                                        <Flex>
                                                            <Text
                                                                fontWeight="bold"
                                                                p="3"
                                                                fontSize="lg"
                                                            >
                                                                Authenticated By
                                                                Manufacturer
                                                                Addresses:{" "}
                                                                {sellerInformationData.authenticatedBy.map(
                                                                    (p) => {
                                                                        return (
                                                                            p +
                                                                            "\n"
                                                                        );
                                                                    }
                                                                )}
                                                            </Text>
                                                        </Flex>
                                                    </Box>
                                                    {sellerInformationData.cordinates ? (
                                                        <Flex justifyContent="space-between">
                                                            <Button
                                                                colorScheme="green"
                                                                ms="6"
                                                                onClick={onOpen}
                                                            >
                                                                Show
                                                                Transactions
                                                            </Button>
                                                            <Button
                                                                me="6"
                                                                colorScheme="blue"
                                                                onClick={() =>
                                                                    openInNewTab(
                                                                        `http://google.com/maps/place/${sellerInformationData.cordinates}`
                                                                    )
                                                                }
                                                            >
                                                                Get Navigation
                                                            </Button>
                                                        </Flex>
                                                    ) : (
                                                        <Box></Box>
                                                    )}
                                                </Box>
                                                <Flex>
                                                    {sellerInformationData.cordinates ? (
                                                        <Box w="100%">
                                                            <SellerProductsMaps
                                                                cordinates={
                                                                    sellerInformationData.cordinates
                                                                }
                                                            />
                                                        </Box>
                                                    ) : (
                                                        <Box></Box>
                                                    )}
                                                </Flex>
                                            </SimpleGrid>
                                        ) : (
                                            <Flex>
                                                <Text>
                                                    Nothing to Show here
                                                </Text>
                                            </Flex>
                                        )}
                                    </Box>
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
                <BuyerFooter />
            </Box>
        </>
    );
}
