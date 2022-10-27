import React from 'react'
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Image,
    Divider,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import {
    MinusIcon,
    AddIcon
} from "@chakra-ui/icons";
export default function Faqs() {
    return (
        <>
            <Box mb={5} mt={8} align="center">
                <Text fontSize={"3xl"} fontWeight="semiBold">Frequently Asked Questions</Text>
            </Box>
            <Accordion allowMultiple mx="200" my={8}>
                <AccordionItem borderWidth={1} borderRadius={6} mb={3}>
                    {({ isExpanded }) => (
                        <>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'blue.500', color: 'white', fontWeight: 'bold', borderRadius: '6px' }}>
                                    <Box flex='1' textAlign='left' fontWeight={"bold"}>
                                        How does our services work?
                                    </Box>
                                    {isExpanded ? (
                                        <MinusIcon fontSize='12px' />
                                    ) : (
                                        <AddIcon fontSize='12px' />
                                    )}
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} color="blackAlpha.600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
                <AccordionItem borderWidth={1} borderRadius={6} mb={3}>
                    {({ isExpanded }) => (
                        <>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'blue.500', color: 'white', fontWeight: 'bold', borderRadius: '6px' }}>
                                    <Box flex='1' textAlign='left' fontWeight={"bold"}>
                                        Is there any hidden fees after using this dapp?
                                    </Box>
                                    {isExpanded ? (
                                        <MinusIcon fontSize='12px' />
                                    ) : (
                                        <AddIcon fontSize='12px' />
                                    )}
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} color="blackAlpha.600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
                <AccordionItem borderWidth={1} borderRadius={6} mb={3}>
                    {({ isExpanded }) => (
                        <>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'blue.500', color: 'white', fontWeight: 'bold', borderRadius: '6px' }}>
                                    <Box flex='1' textAlign='left' fontWeight={"bold"}>
                                        How does this dapp works with blockchain in authentication sellers?
                                    </Box>
                                    {isExpanded ? (
                                        <MinusIcon fontSize='12px' />
                                    ) : (
                                        <AddIcon fontSize='12px' />
                                    )}
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} color="blackAlpha.600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            </Accordion>
            <Box mb={5} mx="300" my={8}>
                <Text fontSize={"3xl"} fontWeight="semiBold" mb={4} align="center">Still Have Questions?</Text>
                <Text fontSize={"md"} color="blackAlpha.600"> if you cannot find answer to your Questions in our FAQ, you can always contact us, We will answer to you shortly!
                </Text>
            </Box>
        </>

    )
}
