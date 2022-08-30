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
    Stack
} from "@chakra-ui/react";
export default function ManufacturerTable() {
    return (
        <>
            <TableContainer>
                <Table variant="striped" >
                    <TableCaption>
                        Manufacturer Product distribution Control Panel
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th isNumeric>User Address </Th>
                            <Th isNumeric>Product Requested</Th>
                            <Th isNumeric>Approve or deny</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {/* //TODO call an api here for data retreival and Map function. */}
                        <Tr>
                            <Td isNumeric> 0x32423423</Td>
                            <Td isNumeric>6</Td>
                            <Td>
                                <Stack direction="row" justifyContent="end">
                                    <Badge colorScheme="green" cursor="pointer">
                                        Accept
                                    </Badge>
                                    <Badge colorScheme="red" cursor="pointer">
                                        Remove
                                    </Badge>
                                </Stack>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
