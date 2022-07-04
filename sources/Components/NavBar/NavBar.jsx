import React, { useEffect, useState } from "react";
import { StyleSheet, Keyboard, View } from "react-native";
import { MaterialCommunityIcons, Foundation } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import { setProductosFiltrados } from "../../../redux/actions";

const Container = styled.View`
  position: relative;
  // justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 10%;
  top: 5%;
  margin-bottom: 10%;
  // background-color: grey;
`;

const Button = styled.Pressable`
  position: absolute;
  bottom: 5%;
  right: 5%;
  padding: 10px;
  background-color: rgba(194, 194, 194, 0.69);
  border-radius: 15px;
`;
const Filter = styled.Pressable`
  position: absolute;
  bottom: 5%;
  right: 18%;
  padding: 10px;
  padding-left: 12px;
  padding-right: 12px;
  background-color: rgba(194, 194, 194, 0.69);
  border-radius: 15px;
`;

const Titulo = styled.Text`
  position: absolute;
  top: 50%;
  left: 9%;
  font-size: 20;
  font-weight: 600;
`;

const styles = StyleSheet.create({
  buscador: {
    position: "absolute",
    flex: 1,
    width: "65%",
    bottom: "5%",
    left: "5%",
    shadowOpacity: "0",
    // padding: 10,
    borderRadius: 14,
    backgroundColor: "rgba(194, 194, 194, 0.69)",
    color: "grey",
    fontFamily: "Poppins-M",
  },
});

export default function NavBar({
  titulo,
  setOption,
  screen,
  mostrar,
  setMostrar,
  flag,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const productos = useSelector((state) => state.productos);
  const searchValue = useSelector((state) => state.searchBar);

  useEffect(() => {
    if (screen === "Inicio") {
      // Keyboard.dismiss();
    }
  }, [screen]);

  const handleSearch = (text) => {
    dispatch(
      setProductosFiltrados(
        productos.filter((producto) =>
          producto.nombre.toUpperCase().includes(text.toUpperCase())
        ),
        text
      )
    );
  };

  const handleOnFocus = () => {
    screen === "Inicio" && navigation.navigate("Tienda");
  };

  return (
    <Container>
      <>
        {screen === "Tienda" ? (
          <Filter onPress={() => setMostrar(!mostrar)}>
            <Foundation
              name="filter"
              size={26}
              color="black"
              style={{ alignItems: "center", justifyContent: "center" }}
            />
          </Filter>
        ) : (
          <></>
        )}

        <Button onPress={() => navigation.navigate("Carrito")}>
          <MaterialCommunityIcons
            name="cart"
            size={26}
            color="black"
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </Button>
      </>

      {titulo ? (
        <View
          style={
            titulo === "Cuenta" || titulo === "Favoritos"
              ? {
                  height: "100%",
                  width: "80%",
                }
              : {
                  display: "flex",
                  // justifyContent: "flex-end",
                  height: "100%",
                  width: "80%",
                  marginLeft: "5%",
                }
          }
        >
          {titulo !== "Cuenta" && titulo !== "Favoritos" && (
            <AntDesign
              style={{ marginTop: "12%" }}
              name="arrowleft"
              size={24}
              color="black"
              onPress={() => {
                setOption("Cuenta");
              }}
            />
          )}

          <Titulo>{titulo}</Titulo>
        </View>
      ) : (
        <Searchbar
          placeholder="Buscar producto..."
          style={styles.buscador}
          onChangeText={(text) => handleSearch(text)}
          onFocus={handleOnFocus}
          value={searchValue}
          autoFocus={flag}
          showSoftInputOnFocus={flag}
          inputStyle={{
            fontFamily: "Poppins-M",
            fontSize: 15,
            color: "grey",
          }}
        />
      )}
    </Container>
  );
}
