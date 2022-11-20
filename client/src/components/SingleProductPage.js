import React from "react";
import lcdImage from "../images/lcd-image.jpg";
import GoogleMaps from "../components/GoogleMaps";
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
    return (
        <Box bg="blackAlpha.50" w="100vw">
            <BuyerNavbar />
            <SimpleGrid columns={2} h="80vh" w="100vw" spacing="5">
                <Image src={lcdImage} mt="5" ms="2" borderRadius="4"></Image>
                <Box textAlign="left" mt="5">
                    <Text fontSize="4xl" ps="2">
                        Product Name
                    </Text>
                    <Text fontSize="2xl" ps="2" color="gray.500">
                        $48.00
                    </Text>
                    <Button
                        m="3"
                        w="15rem"
                        borderRadius={4}
                        colorScheme="facebook"
                    >
                        Add to Cart{" "}
                    </Button>
                    <Text
                        fontSize="md"
                        pe={12}
                        fontWeight="medium"
                        color="gray.500"
                        mt="4"
                    >
                        "Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Rerum eligendi sed et sit corporis officia,
                        molestias voluptate, aliquam recusandae quia magni
                        perferendis minus neque, praesentium esse repellat!
                        Optio, cupiditate dolorum. Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vitae, neque! Id velit
                        vero labore dolorum quasi. Maxime quibusdam enim minus
                        alias aliquid provident eum facere quia, labore expedita
                        voluptatem at."
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
                                            <Td>inches</Td>
                                            <Td>millimetres (mm)</Td>
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
                                    Shop Location
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Flex justifyContent="center">
                                <Box>
                                    <GoogleMaps />
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
