import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Favorito, NavBar } from "../index";
import { getFavoritos } from "../../../redux/actions";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
  },
  espacio: {
    marginTop: 45,
  },
  cartel: {
    display: "flex",
    justifyContent: "center",
  },
  favoritos: {
    position: "absolute",
    fontSize: 30,
    top: 10,
    right: 20,
    zIndex: 999,
  },
});

export default function Favoritos({ navigation }) {
  const dispatch = useDispatch();

  const favoritos = useSelector((state) => state.favoritos);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(getFavoritos(userInfo.uid));
  }, [userInfo]);

  return (
    <>
      <NavBar titulo="Favoritos" />

      {favoritos.length !== 0 ? (
        <FlatList
          style={{ height: "100%", marginTop: "2%" }}
          data={favoritos}
          renderItem={({ item }) => (
            <Favorito navigation={navigation} item={item} />
          )}
        />
      ) : (
        <View style={styles.cartel}>
          <Text style={styles.text}>No hay favoritos aún</Text>
        </View>
      )}
    </>
  );
}
