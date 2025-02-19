import { useState } from 'react';
import { Box, Container, Input, Heading, VStack } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { FormControl, FormLabel} from '@chakra-ui/form-control'; 


const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    console.log(e);
  };

  return (
    <Container maxW="container.sm">
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
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default SignupPage;