import { Button, Container, Flex, HStack, Text, useColorMode, Menu, MenuButton, MenuList, MenuItem, MenuDivider} from '@chakra-ui/react'; 
import {Link} from "react-router-dom"; 

import { PlusSquareIcon, ChevronDownIcon  } from "@chakra-ui/icons"; 
import { IoMoon } from "react-icons/io5"; 
import { LuSun } from "react-icons/lu"; 
import { FiUser } from "react-icons/fi";

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode(); 

    const handleClick = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }


    return (
    <Container maxW="1140" px={4}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base:"column",
                sm:"row"
            }}
        >

            <Text
                fontSize={{ base: "22", sm: "28"}}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-r, yellow.400, orange.500)"}
                bgClip={"text"}
            >
                <Link to={"/"}>JobReviews</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
                {/* <Link to={"signup"}>
                <Button>
                    <PlusSquareIcon fontSize={20}/> 
                </Button>
                </Link> */}
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon/> : <LuSun size="20"/>}
                </Button>

                <Menu>
                    <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon/>}
                        leftIcon={<FiUser/>}
                    >
                        Account
                    </MenuButton>
                    <MenuList>
                        <Link to = "signup">
                            <MenuItem>Sign Up</MenuItem>
                        </Link>
                        <MenuDivider/>
                        <Link to = "login">
                            <MenuItem>Log In</MenuItem>
                        </Link>
                        <MenuDivider/> 
                        <Link onClick = {handleClick} to = "/login">
                            <MenuItem>Log Out</MenuItem>
                        </Link>
                        {/* <Link to = "review">
                            <MenuItem>Reveiws</MenuItem>
                        </Link> */}
                    </MenuList>
                </Menu>
            </HStack>

        </Flex>
    </Container> 
    );
}; 

export default Navbar; 