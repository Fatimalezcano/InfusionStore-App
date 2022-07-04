import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

const styles = StyleSheet.create({
  contProd: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#c8c8c8",
    borderBottomWidth: 1,
  },

  contFoto: {
    width: 120,
    height: 120,
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
    marginBottom: 5,
  },

  precio: {
    // position: "absolute",
    bottom: 0,
    // marginTop: 5,
    fontWeight: "bold",
  },
});

function Producto(props) {
  const goToProduct = (idProd) => {
    props.navigation.navigate("DetalleProducto", { id: idProd });
  };

  return (
    <TouchableWithoutFeedback onPress={() => goToProduct(props.id)}>
      <View style={styles.contProd}>
        <View style={styles.contFoto}>
          <Image source={props.imagen} style={styles.img} />
        </View>
        <ScrollView style={styles.contDatos}>
          <Text style={styles.nombre}>{props.nombre}</Text>
          <Text>Stock: {props.stock}</Text>
          <Text>{props.descripcion.slice(0, 90)}</Text>
          <Text style={styles.precio}>
            ${props.precio.toLocaleString("es-ES")}
          </Text>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Producto;
