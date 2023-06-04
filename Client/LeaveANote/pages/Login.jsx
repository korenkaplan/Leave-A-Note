import { View } from 'react-native'
import React, {useState} from 'react'
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
export default function Login({ navigation }) {
  const handleLogin = async ()=>{
//hangle the login
  } 
  return (
    <Center w="100%">
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
      color: "warmGray.50"
    }}>
        Leave a Note
      </Heading>
      <Heading mt="1" _dark={{
      color: "warmGray.200"
    }} color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input variant="rounded" placeholder="Email"  />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input variant="rounded" placeholder="Password" type='password' />
          <Link _text={{
          fontSize: "xs",
          fontWeight: "500",
          color: "indigo.500"
        }} alignSelf="flex-end" mt="1">
            Forget Password?
          </Link>
        </FormControl>
        <Button variant='subtle' mt="2" >
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="coolGray.600" _dark={{
          color: "warmGray.200"
        }}>
            I'm a new user.{" "}
          </Text>
          <Link _text={{
          color: "indigo.500",
          fontWeight: "medium",
          fontSize: "sm"
        }} onPress={()=> navigation.navigate("SignUp")}>
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  </Center>
  )
}

