/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";
import DefaultAuth from "layouts/auth/Default";
import {RadioGroup, HStack, Radio} from "@chakra-ui/react";
// Assets
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [cnpj, setCnpj] = useState("")
  const [adress, setAdress] = useState("")
  const [numero, setNumero] = useState(0)
  const [city, setCity] = useState("")
  const [buttonText, setButtonText] = useState("Cadastrar");
  const [error, setError] = useState(undefined);
  const history = useHistory();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const register = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (name === "") {
      return setError("Voce deve informar um nome");
    }
    if (email === "") {
      return setError("Voce deve informar um email");
    }
    if (password === "") {
      return setError("Voce deve informar uma senha");
    }
    if (userType === "") {
      return setError("Voce deve informar um tipo de usuario");
    }
    if(adress === "") {
      return setError("Voce deve informar um endereço");
    }
    if(numero === 0) {
      return setError("Voce deve informar um numero");
    }
    if(city === "") {
      return setError("Voce deve informar uma cidade");
    }
    if(cnpj === "" && userType === "company"){
      return setError("Voce deve informar um cnpj");  
    }
    try {
      setButtonText("Cadastrando");
      let response = await AuthApi.Register({
        email: email,
        username: name,
        password: password,
        cnpj: cnpj,
        usertype: userType,
        adress: adress,
        adress_number: numero,
        city: city
      });
      console.log(response)
      if (response.data && response.data.success === false) {
        setButtonText("Sign up");
        return setError(response.data.msg);
      }
      return history.push("/auth/sign-in");
    } catch (err) {
      console.log(err);
      setButtonText("Sign up");
      if (err.response) {
        return setError(err.response.data.msg);
      }
      return setError("Houve um erro");
    }
  };
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Cadastre-se
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Cadastre-se no sistema para acessar as informações
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
          >
            <h4
              style={{
                fontSize: ".9em",
                color: "red",
                textAlign: "center",
                fontWeight: 400,
                transition: ".2s all",
              }}
            >
              {error}
            </h4>
            
              <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Nome<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='Digite seu nome'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setName(event.target.value);
                  setError(undefined);
                }}
              />
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
              Tipo de usuário<Text color={brandStars}></Text>
              </FormLabel>
              <RadioGroup
                value={userType}
                onChange={(value) => setUserType(value)}
                >
                <HStack spacing="24px">
                  <Radio value="company" onChange={() => setUserType("company")}>
                    CNPJ
                  </Radio>
                  <Radio value="user" onChange={() => setUserType("user")}>
                    CPF
                  </Radio>
                </HStack>
              </RadioGroup>
              <br></br>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'
                style={{
                  display: userType === 'company' ? 'block' : 'none'
                }}
              >
                CNPJ<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={userType === 'company'}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='CNPJ'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setCnpj(event.target.value);
                  setError(undefined);
                }}
                style={{
                  display: userType === 'company' ? 'block' : 'none'
                }}
              />
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Endereço<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='Endereço'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setAdress(event.target.value);
                  setError(undefined);
                }}
              />
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Número<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='Número'
                mb='24px'
                fontWeight='500'
                size='lg'
                type="number"
                onChange={(event) => {
                  setNumero(event.target.value);
                  setError(undefined);
                }}
              />
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Cidade<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='Cidade'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setCity(event.target.value);
                  setError(undefined);
                }}
              />
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                type='email'
                placeholder='seuemail@gmail.com'
                mb='24px'
                fontWeight='500'
                size='lg'
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError(undefined);
                }}
              />
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                Senha<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Minimo 8 caracteres'
                  mb='24px'
                  size='lg'
                  type={show ? "text" : "password"}
                  variant='auth'
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError(undefined);
                  }}
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                onClick={register}
              >
                {buttonText}
              </Button>
            </FormControl>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Já tem uma conta?
              <NavLink to="/auth/sign-in">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Login
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );  
}

export default SignIn;


