import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AuthApi from "../../../api/auth";

export default function WaterAccount() {
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(new Date());
  const [utilization, setUtilization] = useState(0);
  const [error, setError] = useState(undefined);
  const [buttonText, setButtonText] = useState("Cadastrar");
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const register = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!date) {
      return setError("Você deve inserir uma data da conta");
    }
    if (!utilization) {
      return setError("Você deve inserir a utilização");
    }
    if (!value) {
      return setError("Você deve inserir o valor da conta");
    }
    try {
      setButtonText("Cadastrando");
      const userId = localStorage.getItem('userId');
      let response = await AuthApi.Register({
        companyid: userId,
        date: date,
        utilization: utilization,
        value: value,
      });
      console.log(response)
      console.log(userId)
      if (response.data && response.data.success === false) {
        setButtonText("Cadastrar");
        return setError(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      setButtonText("Cadastrar");
      if (err.response) {
        return setError(err.response.data.msg);
      }
      return setError("Houve um erro");
    }
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
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
        mt={{ base: "15px", md: "5vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Cadastre sua conta de energia abaixo
          </Text>
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
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Data da conta<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="date" // Usando o tipo 'date'
                placeholder="Digite a data da conta (YYYY-MM-DD)"
                mb="24px"
                defaultValue={date}
                fontWeight="500"
                size="lg"
                onChange={(event) => {
                  setDate(event.target.value);
                  setError(undefined);
                }}
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Utilização (KWh)<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="number"
                placeholder="Digite o valor da conta"
                mb="24px"
                defaultValue={utilization}
                fontWeight="500"
                size="lg"
                onChange={(event) => {
                  setUtilization(event.target.value);
                  setError(undefined);
                }}
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Valor da conta<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                ms={{ base: "0px", md: "0px" }}
                type="number"
                placeholder="Digite o valor da conta"
                mb="24px"
                defaultValue={value}
                fontWeight="500"
                size="lg"
                onChange={(event) => {
                  setValue(event.target.value);
                  setError(undefined);
                }}
              />
              <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
                onClick={register}
              >
                {buttonText}
              </Button>
            </FormControl>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
  