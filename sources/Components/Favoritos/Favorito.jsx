import React from "react";
import { Text, View, StyleSheet, Image, Pressable, Alert } from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { eliminarDeFavoritos, añadirAFavoritos } from "../../../redux/actions";

import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
  contProd: {
    width: "96%",
    display: "flex",
    flexDirection: "row",
    borderColor: "#c8c8c8",
    borderWidth: 1,
    margin: "2%",
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "#c8c8c8",
  },

  contFoto: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    marginLeft: 14,
  },

  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },

  contDatos: {
    width: 200,
    margin: 10,
  },

  nombre: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 5,
  },

  precio: {
    position: "absolute",
    bottom: 0,
    // marginTop: 5,
    fontWeight: "bold",
  },
  favoritos: {
    position: "absolute",
    fontSize: 30,
    top: 10,
    right: 20,
    zIndex: 999,
  },
});

export default function Favorito({ navigation, item }) {
  const favoritos = useSelector((state) => state.favoritos);
  const dispatch = useDispatch();

  function handleFav() {
    if (favoritos.find((fav) => fav.id == item.id)) {
      // dispatch(eliminarDeFavoritos(item.id));
      // alert("Producto eliminado de favoritos");
      Alert.alert(
        "Eliminar producto",
        "¿Estas seguro de eliminar este producto de tus favoritos?",
        [
          {
            text: "Si",
            style: "destructive",
            onPress: () => {
              dispatch(eliminarDeFavoritos(item.id));
              // Alert.alert(" ", "Producto eliminado de favoritos");
            },
          },
          {
            text: "No",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
      // Toast.show({
      //   position: "top",
      //   visibilityTime: 2000,
      //   autoHide: true,
      //   type: "error",
      //   text1: "Producto eliminado de favoritos",
      //   topOffset: 10,
      //   bottomOffset: 0,
      //   onShow: () => {},
      //   onHide: () => {},
      // });
    } else {
      dispatch(añadirAFavoritos(item));
      alert("Producto agregado a la lista de favoritos");
    }
  }
  return (
    // <Toast />

    <Pressable
      onPress={() => navigation.navigate("DetalleProducto", { id: item.id })}
    >
      <View style={styles.contProd}>
        <View style={styles.contFoto}>
          <Image source={{ uri: item.imagen }} style={styles.img} alt="uwu" />
        </View>
        <View style={styles.contDatos}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.precio}>${item.precio}</Text>
        </View>

        <View style={styles.favoritos}>
          {favoritos.find((fav) => fav.id == item.id) && (
            <AntDesign
              onPress={handleFav}
              name="heart"
              size={24}
              color="black"
            />
          )}
        </View>
      </View>
    </Pressable>
  );
}
