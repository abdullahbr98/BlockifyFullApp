import React from "react";
import { FaHome, FaUserEdit } from "react-icons/fa";
import { HiOutlineCurrencyDollar, HiShoppingCart } from "react-icons/hi";
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Icon,
    Avatar,
    AvatarBadge,
    AvatarGroup,
    Tooltip,
} from "@chakra-ui/react";
import { SettingsIcon, AddIcon, EditIcon } from "@chakra-ui/icons";
import { GoPackage } from "react-icons/go";
export default function SellerLeftMenu(props) {
    return (
        <>
            <Flex
                h="80vh"
                w="7vw"
                // borderColor="pink"
                // borderWidth="1px"
                align="center"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Box align="center" pt="0">
                    <Tooltip label="Home" fontSize="md">
                        <span>
                            <Icon
                                as={FaHome}
                                w="5"
                                h="5"
                                cursor="pointer"
                                onClick={props.displayHomeFunc}
                            />
                        </span>
                    </Tooltip>
                </Box>
                <Box align="center" pt="0">
                    <Tooltip label="Shop Information" fontSize="md">
                        <span>
                            <Icon
                                as={HiShoppingCart}
                                w="5"
                                h="5"
                                cursor="pointer"
                                onClick={props.shopInfoFunc}
                            />
                        </span>
                    </Tooltip>
                </Box>
                <Box align="center" pt="0">
                    <Tooltip label="Add Products" fontSize="md">
                        <Icon
                            as={AddIcon}
                            w="5"
                            h="5"
                            cursor="pointer"
                            onClick={props.productReqFunc}
                        />
                    </Tooltip>
                </Box>
                <Box align="center" pt="0">
                    <Tooltip label="Orders Placed" fontSize="md">
                        <span>
                        <Icon
                            as={GoPackage}
                            w="6"
                            h="6"
                            cursor="pointer"
                            onClick={props.profileInfoFunc}
                        />
                        </span>
                    </Tooltip>
                </Box>
                <Box align="center" pt="0">
                    <Tooltip label="Purchase Requests" fontSize="md">
                        <span>
                            <Icon
                                as={HiOutlineCurrencyDollar}
                                w="7"
                                h="7"
                                cursor="pointer"
                                onClick={props.purchaseReqFunc}
                            />
                        </span>
                    </Tooltip>
                </Box>
                <Flex>
                    <Tooltip label="Seller Account" fontSize="md">
                        <Avatar
                            w="8"
                            h="8"
                            cursor="pointer"
                            onClick={props.sellerAuthenticateFunc}
                        >
                            <AvatarBadge boxSize="1em" bg="green.500" />
                        </Avatar>
                    </Tooltip>
                </Flex>
            </Flex>
        </>
    );
}
