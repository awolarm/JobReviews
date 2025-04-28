import { Input, Box, Text, VStack, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import deskImage from '../pages/images/desk.jpg'
const HomePage = () => {
    return(
        <Box
            backgroundImage={deskImage}
            backgroundSize="cover"
            backgroundPosition="center"
            height="100vh"
            width="100%"
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            {/* Overlay to darken the image and make text more readable */}
            <Box 
                position="absolute"
                top="400"
                left="0"
                width="100%"
                height="49%"
                backgroundColor="rgba(0, 0, 0, 0.5)"
            />
            
            {/* Logo */}
            <Box 
                zIndex="1" 
                mb="8"
            >
                <Text
                    fontSize="6xl"
                    fontWeight="bold"
                    color="white"
                    textAlign="center"
                >
                    UNFILTERED UNBIASED UNRESTRICTED
                </Text>
            </Box>
            
            {/* Search prompt */}
            <Text
                zIndex="1"
                fontSize="3xl"
                fontWeight="medium"
                color="white"
                mb="6"
            >
                Enter your <Text as="span" fontWeight="bold">company</Text> to get started
            </Text>
            
            {/* Search input */}
            <InputGroup 
                maxW="700px"  
                zIndex="1"
                size="lg"     
            >
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" fontSize="20px" />} 
                    h="full"  
                />
                <Input
                    bg="black !important"
                    color="white !important"
                    placeholder="Company Name"
                    size="lg"
                    height="70px" 
                    fontSize="3xl" 
                    borderRadius="full"
                    paddingLeft="50px"  
                    _placeholder={{ color: "gray.400", fontSize: "2xl" }}
                    borderColor="white !important"
                    _hover={{ borderColor: "orange.500 !important"}}
                    _focus={{
                        borderColor: "orange.500 !important",
                        boxShadow: "none !important"
                    }}
                />
            </InputGroup>
            
        </Box>
    )
}

export default HomePage;