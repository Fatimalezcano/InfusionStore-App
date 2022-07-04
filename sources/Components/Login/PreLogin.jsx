import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  icono: {
    position: "absolute",
    top: "6%",
    left: "40%",
    width: 80,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.46)",
    borderRadius: 100,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    // margin: 5,
  },
  titulo: {
    position: "absolute",
    width: "100%",
    top: "15%",
    // left: "18%",
    textAlign: "center",
    color: "white",
    fontSize: 40,
    fontFamily: "Poppins",
    // margin: 10,
  },
  botones: {
    position: "absolute",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // left: "15%",
    textAlign: "center",
    bottom: "10%",
  },
  botonIniciar: {
    width: 300,
    height: 56,
    // backgroundColor: "rgba(0, 0, 0, 0.67)",
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  botonRegistrar: {
    width: 300,
    height: 56,
    // backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function PreLogin() {
  const navigation = useNavigation();

  const iniciarSesion = () => {
    navigation.navigate("Login");
  };

  const registrar = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://wallpaperaccess.com/full/2362867.jpg" }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.icono}>
          <Fontisto
            style={{
              width: "100%",
              // height: "100%",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            name="coffeescript"
            size={38}
            color="white"
          />
        </View>
        <Text style={styles.titulo}>Infusion Store</Text>

        <View style={styles.botones}>
          <Pressable
            onPress={iniciarSesion}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "black" : "rgba(0, 0, 0, 0.67)",
              },
              styles.botonIniciar,
            ]}
            //   style={styles.botonIniciar}
          >
            <Text
              style={{ fontFamily: "Poppins-M", fontSize: 20, color: "white" }}
            >
              Iniciar sesion
            </Text>
          </Pressable>

          <Pressable
            onPress={registrar}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "white" : "rgba(255, 255, 255, 0.4)",
              },
              styles.botonRegistrar,
            ]}
            // style={styles.botonRegistrar}
          >
            <Text
              style={{ fontFamily: "Poppins-M", fontSize: 20, color: "black" }}
            >
              Registrarse
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
