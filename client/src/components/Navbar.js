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
} from "@chakra-ui/react";
import logo from "../images/BlockifyLogo.png";
import { useState, useEffect } from "react";
import { ConnectButton } from "@web3uikit/web3";
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from "@chakra-ui/icons";

export default function Navbar({ guestAccess }) {
    const { isOpen, onToggle } = useDisclosure();
    const [accountAddress, setaccountAddress] = useState("");
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("UserAddress"));
        if (items) {
            setaccountAddress(items);
        }
    }, []);

    return (
        <Box mb={25}>
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
            >
                <Flex
                    flex={{ base: 1, md: "auto" }}
                    ml={{ base: -2 }}
                    display={{ base: "flex", md: "none" }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: "center", md: "start" }}
                >
                    <Image boxSize="30px" src={logo} alt="Dan Abramov" />
                    <Text
                        fontSize={20}
                        textAlign={useBreakpointValue({
                            base: "center",
                            md: "left",
                        })}
                        fontFamily={"heading"}
                        color={useColorModeValue("gray.800", "white")}
                        fontWeight="semibold"
                        ms={5}
                    >
                        Blockify
                    </Text>

                    {guestAccess ? <Flex display={{ base: "none", md: "flex" }} ml={10}>
                        <DesktopNav />
                    </Flex> : <Flex display={{ base: "none", md: "flex" }} ml={10}>
                        <Text fontWeight="normal" ms={12} fontSize="xl" color="black">Manufacturer Dashboard</Text>
                    </Flex>}
                </Flex>
                <Text
                    fontWeight="bold"
                    fontSize="12px"
                    mr={2}
                    p={2}
                    borderColor="blue.100"
                    borderWidth="1px"
                    borderRadius="10px"
                    bg="blue.100"
                >
                    userAddress: {accountAddress}
                </Text>

                {guestAccess ? (
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={"flex-end"}
                        direction={"row"}
                        spacing={2}
                    >
                        <Button
                            display={{ base: "none", md: "inline-flex" }}
                            fontSize={"sm"}
                            fontWeight={600}
                            bg="blue.500"
                            color="white"
                            _hover={{
                                bg: "pink.300",
                            }}
                        >
                            <a href="/register"> Sign Up</a>
                        </Button>
                        <Button
                            display={{ base: "none", md: "inline-flex" }}
                            fontSize={"sm"}
                            fontWeight={600}
                            variant="outline"
                            color="green.400"
                            borderColor="green.400"
                            _hover={{
                                bg: "green.100",
                            }}
                        >
                            <a href="/login"> Log In</a>
                        </Button>
                    </Stack>
                ) : (
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={"flex-end"}
                        direction={"row"}
                        spacing={2}
                    >
                        <Button
                            display={{ base: "none", md: "inline-flex" }}
                            fontSize={"sm"}
                            fontWeight={600}
                            variant="outline"
                            color="red.400"
                            borderColor="red.400"
                            _hover={{
                                bg: "red.100",
                            }}
                        >
                            <a href="/"> Log Out</a>
                        </Button>
                    </Stack>
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.800");

    return (
        <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? "#"}
                                fontSize={"sm"}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: "none",
                                    color: linkHoverColor,
                                }}
                            >
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={"xl"}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={"xl"}
                                minW={"sm"}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav
                                            key={child.label}
                                            {...child}
                                        />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={"group"}
            display={"block"}
            p={2}
            rounded={"md"}
            _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
        >
            <Stack direction={"row"} align={"center"}>
                <Box>
                    <Text
                        transition={"all .3s ease"}
                        _groupHover={{ color: "pink.400" }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={"sm"}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={"all .3s ease"}
                    transform={"translateX(-10px)"}
                    opacity={0}
                    _groupHover={{
                        opacity: "100%",
                        transform: "translateX(0)",
                    }}
                    justify={"flex-end"}
                    align={"center"}
                    flex={1}
                >
                    <Icon
                        color={"pink.400"}
                        w={5}
                        h={5}
                        as={ChevronRightIcon}
                    />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            display={{ md: "none" }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? "#"}
                justify={"space-between"}
                align={"center"}
                _hover={{
                    textDecoration: "none",
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue("gray.600", "gray.200")}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={"all .25s ease-in-out"}
                        transform={isOpen ? "rotate(180deg)" : ""}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse
                in={isOpen}
                animateOpacity
                style={{ marginTop: "0!important" }}
            >
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    align={"start"}
                >
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}


const NAV_ITEMS: Array<NavItem> = [
    {
        label: "Home",
        children: [
            {
                label: "Explore Design Work",
                subLabel: "Trending Design to inspire you",
                href: "#",
            },
            {
                label: "New & Noteworthy",
                subLabel: "Up-and-coming Designers",
                href: "#",
            },
        ],
    },
    {
        label: "About Us",
        children: [
            {
                label: "Job Board",
                subLabel: "Find your dream design job",
                href: "#",
            },
            {
                label: "Freelance Projects",
                subLabel: "An exclusive list for contract work",
                href: "#",
            },
        ],
    },
    {
        label: "FAQ",
        href: "#",
    },
    {
        label: "Pricing",
        href: "#",
    },
];
