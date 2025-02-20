import { useToast } from "@chakra-ui/toast"; 
import { useEffect } from 'react';


const HomePage = () => {
    const toast = useToast(); 
    useEffect(() => {
        toast({
            title: "Passwords do not match", 
            status: "error", 
            duration: 3000, 
            isClosable: true, 
        }); 
    },[]); 
    return(
        <div>HomePage</div>
    )
}

export default HomePage; 