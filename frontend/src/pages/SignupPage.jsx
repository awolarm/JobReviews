import { useState, useEffect } from 'react';
import { Box, Button, Container, Input, Heading, VStack, useColorMode, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { FormControl, FormLabel} from '@chakra-ui/form-control'; 

const API_CONFIG = {
    BASE_URL: 'http://localhost:5000', 
    SIGNUP_ENDPOINT: '/api/auth/signup'
}

const SignupPage = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const formBg = useColorModeValue("white", "gray.700");
  const inputBg = useColorModeValue("gray.50", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', 
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastStatus, setToastStatus] = useState('');

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true); 

    if(formData.password !== formData.confirmPassword) {
        setToastMessage("Passwords do not match");
        setToastStatus("error");
        setShowToast(true);
        setIsLoading(false); 
        return; 
    }

    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.SIGNUP_ENDPOINT}`, {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json', 
            },
            body : JSON.stringify({
                username: formData.username, 
                email: formData.email, 
                password: formData.password 
            })
        }); 

        if(!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || 'Failed to create account '); 
        }
        setToastMessage("Account created successfully!");
        setToastStatus("success");
        setShowToast(true);
    } catch(error) {
        setToastMessage(error.message || "Error creating account");
        setToastStatus("error");
        setShowToast(true);
    } finally {
        setIsLoading(false); 
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      {showToast && (
        <Box
          position="fixed"
          top="4"
          right="4"
          p="4"
          bg={toastStatus === 'error' ? 'red.500' : 'green.500'}
          color="white"
          borderRadius="md"
          zIndex="toast"
        >
          {toastMessage}
        </Box>
      )}
      
      <VStack spacing={8}>
        <Box
          w="full"
          bg={formBg}
          p={8}
          rounded="lg"
          shadow="lg"
          borderWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
                <Text fontSize='50px' color={textColor}>
                    Sign Up
                </Text>
                <FormControl>
                    <FormLabel color={textColor}>Username</FormLabel>
                    <Input
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      required
                      bg={inputBg}
                      color={textColor}
                      borderColor={useColorModeValue("gray.300", "gray.500")}
                      _hover={{ borderColor: useColorModeValue("gray.400", "gray.400") }}
                      _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color={textColor}>Email</FormLabel>
                    <Input  
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      bg={inputBg}
                      color={textColor}
                      borderColor={useColorModeValue("gray.300", "gray.500")}
                      _hover={{ borderColor: useColorModeValue("gray.400", "gray.400") }}
                      _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color={textColor}>Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required 
                      bg={inputBg}
                      color={textColor}
                      borderColor={useColorModeValue("gray.300", "gray.500")}
                      _hover={{ borderColor: useColorModeValue("gray.400", "gray.400") }}
                      _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color={textColor}>Confirm Password</FormLabel>
                    <Input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required 
                      bg={inputBg}
                      color={textColor}
                      borderColor={useColorModeValue("gray.300", "gray.500")}
                      _hover={{ borderColor: useColorModeValue("gray.400", "gray.400") }}
                      _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                    />
                </FormControl>

                <Button 
                  type="submit"
                  isLoading={isLoading}
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  mt={4}
                > 
                  Sign Up 
                </Button> 
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default SignupPage;