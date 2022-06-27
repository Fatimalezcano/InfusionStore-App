import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
// import Cerrar from "../Cerrar";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components/native";

const Container = styled.View`
  position: relative;
  display: flex;
  // align-items: center;
  width: 99%;
`;

const Cabecera = styled.View`
  height: 15%;
  width: 100%;
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
`;

const Texto = styled.View`
  display: flex;
  justify-content: space-evenly;

  height: 80%;
  width: 70%;
  padding: 2%;
`;

const Input = styled.TextInput`
  height: 8%;
  width: 80%;

  padding: 2%;
  margin: 2%;
`;

const Button = styled.View`
  position: absolute;
  bottom: -100%;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 70%;
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 6%;
  background-color: lightgrey;
`;

const TextButton = styled.Text`
  font-size: 13;
  font-weight: 600;
  text-align: center;
`;

export default function Ajustes({ setOption }) {
  const user = useSelector((state) => state.userInfo);
  const [userDB, setUserDB] = useState({});
  const [saveButton, setSaveButton] = useState(false);

  useEffect(() => {
    axios
      .get("https://proyecto-final-gp1.herokuapp.com/usuarios")
      .then((resp) => {
        const filteredUser = resp.data.filter(
          (usuario) => usuario.id === user?.uid
        )[0];

        setUserDB(
          filteredUser
            ? filteredUser
            : { nombre: user.displayName, mail: user.email }
        );
      });
  }, [user]);

  const handleChange = (e, name) => {
    setSaveButton(true);
    setUserDB({ ...userDB, [name]: e });
  };

  return (
    userDB && (
      <Container>
        {/* <Pressable onPress={() => setOption("Cuenta")}>
          <Cerrar />
        </Pressable> */}

        <Cabecera>
          <Image
            style={{
              // height: "80%",
              width: "20%",
              borderRadius: 50,
              aspectRatio: 1 / 1,
            }}
            source={{ uri: user.photoURL }}
            alt="Profile Picture"
          ></Image>

          <Texto>
            <Text>Mi perfil</Text>
            <Text>Actualiza tus datos personales</Text>
          </Texto>
        </Cabecera>

        <Input
          value={userDB.nombre}
          onChangeText={(e) => handleChange(e, "nombre")}
          placeholder="Nombres"
        ></Input>

        <Input
          value={userDB.apellido}
          onChangeText={(e) => handleChange(e, "apellido")}
          placeholder="Apellidos"
        ></Input>

        <Input
          value={userDB.dni}
          onChangeText={(e) => handleChange(e, "dni")}
          placeholder="DNI"
        ></Input>

        <Input
          value={userDB.direccion}
          onChangeText={(e) => handleChange(e, "direccion")}
          placeholder="Dirección"
        ></Input>

        <Input
          value={userDB.mail}
          onChangeText={(e) => handleChange(e, "mail")}
          placeholder="Correo"
        ></Input>

        <Input
          value={userDB.contraseña}
          onChangeText={(e) => handleChange(e, "contraseña")}
          placeholder="Contraseña"
        ></Input>

        <Input
          value={userDB.telefono}
          onChangeText={(e) => handleChange(e, "telefono")}
          placeholder="Telefono"
        ></Input>

        {saveButton && (
          <View
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "row",

              bottom: "0%",
              width: "100%",
              height: "10%",
            }}
          >
            <TouchableWithoutFeedback>
              <Button left={"10%"}>
                <TextButton>Guardar cambios</TextButton>
              </Button>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Button right={"10%"}>
                <TextButton>Descartar cambios</TextButton>
              </Button>
            </TouchableWithoutFeedback>
          </View>
        )}
      </Container>
    )
  );
}
