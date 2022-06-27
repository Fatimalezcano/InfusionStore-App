import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";
import { Platform, Text, View } from "react-native";
import {
  Ajustes,
  Contacto,
  Historial,
  Notificaciones,
  Reseñas,
  Seguridad,
} from "./Opciones/index";
import { NavBar } from "../index";

const Container = styled.View`
  display: flex;
  // justify-content: center;
  margin-top: 2%;
  // margin-top: ${Platform.OS === "ios" ? "10%" : 0};
`;

const Button = styled.Pressable`
  // background-color: red;
  padding: 6% 4%;
  margin: 1%;
`;

export default function Cuenta({ setIsAuthenticated }) {
  const [option, setOption] = useState("Cuenta");
  const user = useSelector((state) => state.userInfo);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => setOption("Cuenta");

      return () => unsubscribe();
    }, [])
  );

  return (
    <>
      <NavBar titulo={option} setOption={setOption} />
      <Container>
        {option === "Cuenta" && (
          <View>
            <Button onPress={() => setOption("Ajustes")}>
              <Text>Ajustes de Perfil</Text>
            </Button>

            <Button onPress={() => setOption("Historial")}>
              <Text>Historial de Compras</Text>
            </Button>

            <Button onPress={() => setOption("Reseñas")}>
              <Text>Mis Reseñas</Text>
            </Button>

            <Button onPress={() => setOption("Contacto")}>
              <Text>Contacto</Text>
            </Button>

            <Button onPress={() => setIsAuthenticated(false)}>
              <Text>Cerrar Sesión</Text>
            </Button>
          </View>
        )}

        {option === "Ajustes" && <Ajustes setOption={setOption} />}
        {option === "Historial" && <Historial setOption={setOption} />}
        {option === "Reseñas" && <Reseñas setOption={setOption} />}
        {/* {option === "Notificaciones" && (
          <Notificaciones setOption={setOption} />
        )} */}
        {/* {option === "seguridad" && <Seguridad setOption={setOption} />} */}
        {option === "Contacto" && <Contacto setOption={setOption} />}
      </Container>
    </>
  );
}
