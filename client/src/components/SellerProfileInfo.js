import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    useDisclosure,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Text,
    Image,
    Badge,
    Flex,
    Button,
    Input,
    Table,
    Thead,
    Tbody,
    Link,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
export default function SellerProfileInfo({ profileInfoFunc }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            {profileInfoFunc ? (
                <>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Order Status</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>Hello</Text>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    colorScheme="red"
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                                <Button variant="ghost">
                                    Secondary Action
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Box align="center" w="90vw">
                        <Flex justifyContent="center">
                            <Text fontSize="2xl">Orders Details</Text>
                        </Flex>
                        <Box mt="10vh" align="center" px={10}>
                            <TableContainer>
                                <Table variant="striped" colorScheme="blue">
                                    <Thead>
                                        <Tr>
                                            <Th>Order ID</Th>
                                            <Th>Order Amount</Th>
                                            <Th>Payment Method</Th>
                                            <Th>Payment Status</Th>
                                            <Th>Order Status</Th>
                                            <Th>Edit Order Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>32423</Td>
                                            <Td>500$</Td>
                                            <Td>Stripe</Td>
                                            <Td>
                                                <Flex>
                                                    <Badge
                                                        colorScheme="green"
                                                        borderRadius={4}
                                                        borderColor="green.500"
                                                        borderWidth="1px"
                                                    >
                                                        Paid
                                                    </Badge>
                                                    <Badge
                                                        colorScheme="red"
                                                        borderRadius={4}
                                                        borderColor="red.500"
                                                        borderWidth="1px"
                                                    >
                                                        Unpaid
                                                    </Badge>
                                                </Flex>
                                            </Td>
                                            <Td>
                                                <Flex>
                                                    <Badge
                                                        colorScheme="green"
                                                        borderRadius={4}
                                                        borderColor="green.500"
                                                        borderWidth="1px"
                                                    >
                                                        Shipped
                                                    </Badge>
                                                    <Badge
                                                        colorScheme="yellow"
                                                        borderRadius={4}
                                                        borderColor="yellow.500"
                                                        borderWidth="1px"
                                                    >
                                                        In transit
                                                    </Badge>
                                                </Flex>
                                            </Td>
                                            <Td>
                                                <Link onClick={onOpen}>
                                                    View Details{" "}
                                                </Link>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </>
            ) : (
                <Box display="none"></Box>
            )}
        </>
    );
}
