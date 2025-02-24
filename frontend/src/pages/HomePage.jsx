import { Button, Stack } from '@chakra-ui/react'

const HomePage = () => {
    return(
        <div>
            <h1>Homepage</h1>
            <Stack spacing={4} direction='row' align='center'>
                <Button colorScheme='teal' size='lg'>
                    Click Me
                </Button>
            </Stack>
        </div>
    )
}

export default HomePage; 