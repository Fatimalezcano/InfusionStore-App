import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
import { getData } from "../../../Functions/localStorage";
import styled from "styled-components/native";
import { setUserInfo } from "../../../../redux/actions";

const Container = styled.View`
  height: 10%;
  width: 100%;
  margin: 10% 0%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Image = styled.Image`
  height: 90%;
  width: 15%;
  aspect-ratio: ${1 / 1};
  resize-mode: cover;
  border-radius: 100;
`;

const Saludo = styled.Text`
  font-family: Poppins-M;
  font-size: 16;
  font-weight: 600;
  margin: 2%;
`;

const Texto = styled.Text`
  font-size: 13;
`;

export default function Bienvenida() {
  const dispatch = useDispatch();
  // const [user, setUser] = useState();
  const user = useSelector((state) => state.userInfo);

  useEffect(() => {
    getData("user").then((res) => {
      if (res) {
        dispatch(
          setUserInfo({
            displayName: res.nombre,
            email: res.email,
            uid: res.uid,
            photoURL: res.photoURL,
          })
        );
      }
    });
  }, [dispatch]);

  return user ? (
    <Container>
      <View>
        <Saludo>{`¡Hola ${user.displayName?.split(" ")[0]}!`}</Saludo>
        <Texto>{`¿Con qué infusión te gustaría empezar tu día?`}</Texto>
      </View>

      <Image source={{ uri: user.photoURL }} alt="Profile Picture"></Image>
    </Container>
  ) : (
    <View></View>
  );
}
