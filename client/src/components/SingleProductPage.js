import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import lcdImage from "../images/lcd-image.jpg";
import GoogleMaps from "../components/GoogleMaps";
import SellerShopInfo from "../components/SellerShopInfo";
import {
    Box,
    Flex,
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
    const [productInfo, setproductInfo] = useState({});
    ///getProductByModelNo
    const { id } = useParams();
    const goToCart = (product)=>{
        localStorage.setItem("cartItems", JSON.stringify(product));
        window.location.href = `http://localhost:3000/cart/`;

    }
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
    }, []);

    return (
        <Box bg="blackAlpha.50" w="100vw">
            <BuyerNavbar />
            <SimpleGrid columns={2} h="80vh" w="100vw" spacing="5">
                <Image src={lcdImage} mt="5" ms="2" borderRadius="4"></Image>
                <Box textAlign="left" mt="5">
                    <Text fontSize="4xl" ps="2">
                        {productInfo.productName}
                    </Text>
                    <Text fontSize="2xl" ps="2" color="gray.500">
                        ${productInfo.price}.00
                    </Text>
                    <Button
                        m="3"
                        w="15rem"
                        borderRadius={4}
                        colorScheme="facebook"
                        onClick={()=>{goToCart(productInfo)}}
                    >
                        Add to Cart
                    </Button>
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
                                <Box flex="1" textAlign="left" fontSize="3xl">
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
                                            <Td>{productInfo.displayType}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Resolution</Td>
                                            <Td>{productInfo.Resolution}</Td>
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
                                            <Td>{productInfo.smartCapable}</Td>
                                        </Tr>

                                        <Tr>
                                            <Td>Featured Streaming Services</Td>
                                            <Td>
                                                {
                                                    productInfo.featuredStreamingServices
                                                }
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Screen mirroring</Td>
                                            <Td>
                                                {productInfo.screenMirroring}
                                            </Td>
                                        </Tr>
                                        <Tr>
                                            <Td>No of HDMI Inputs</Td>
                                            <Td>{productInfo.hdmiInputs}</Td>
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
                                            <Td>{productInfo.speakerType}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Warranty</Td>
                                            <Td>{productInfo.Warranty}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Total Time of Warranty</Td>
                                            <Td>{productInfo.WarrantyTime}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton _hover={{ color: "blue" }}>
                                <Box flex="1" textAlign="left" fontSize="3xl">
                                    From The Manufacturer
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            There is no manufacturer content to show for this
                            product. Explore the Specs sections to learn more
                            about this product details.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _hover={{ color: "blue" }}>
                                <Box flex="1" textAlign="left" fontSize="3xl">
                                    Seller Information
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Flex justifyContent="center">
                                <Box>
                                    <SellerShopInfo />
                                </Box>
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
            <BuyerFooter />
        </Box>
    );
}
