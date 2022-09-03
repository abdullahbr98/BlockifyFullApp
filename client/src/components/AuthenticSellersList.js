import React from "react";
import {
    TableContainer,
    Table,
    Th,
    Tfoot,
    Td,
    Tr,
    Thead,
    Tbody,
    TableCaption,
    Badge,
    Stack,
    Text,
    Box
} from "@chakra-ui/react";
export default function AuthenticSellerList() {
    return (
        <Box px={120} h={"80vh"}>
            <Text align="center" fontSize={"2xl"} color="black" my={4}>Pending Product Requests</Text>
            <TableContainer>
                <Table variant="striped" >
                    <TableCaption>
                        List of Authentic sellers 
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th isNumeric>User Address </Th>
                            <Th isNumeric>Products owned</Th>
                            <Th isNumeric>Remove from list</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {/* //TODO call an api here for data retreival and Map function. */}
                        <Tr>
                            <Td isNumeric> 0x32423423</Td>
                            <Td isNumeric>6</Td>
                            <Td>
                                <Stack direction="row" justifyContent="end">
                                    <Badge colorScheme="red" cursor="pointer">
                                        Remove
                                    </Badge>
                                </Stack>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
}
