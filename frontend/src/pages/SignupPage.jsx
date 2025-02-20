import { useState, useEffect } from 'react';
import { Box, Button, Container, Input, Heading, VStack } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { FormControl, FormLabel} from '@chakra-ui/form-control'; 

const SignupPage = () => {
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
    console.log(formData);
  }, [formData]);

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
        //make API call here
        console.log('Form submitted', formData); 
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
    <Container maxW="container.sm">
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
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          SignUp
        </Heading>
        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                    className="w-full p-2 border rounded"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input  
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full p-2 border rounded"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required 
                        className="w-full p-2 border rounded"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required 
                        className="w-full p-2 border rounded"
                    /> 
                </FormControl>

                <Button 
                    type="submit"
                    isLoading={isLoading}
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