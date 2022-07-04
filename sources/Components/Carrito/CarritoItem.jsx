import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Image, Text, StyleSheet, Button, Pressable } from "react-native";
import { agregarCarrito, restarCarrito } from "../../../redux/actions";

const styles = StyleSheet.create({
  container: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
  },
  containerNombre: {
    display: "flex",
    justifyContent: "space-between",
  },

  imagen: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  nombre: {
    fontFamily: "Poppins-M",
    fontSize: 15,
    maxWidth: "60%",
  },
  precio: {
    // fontFamily: "Poppins-M",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contenedorContador: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    right: 0,
    top: "25%",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#e1d7d7",
    borderRadius: 8,
    fontFamily: "Poppins-M",
    height: 30,
    alignItems: "center",
  },

  botonCantidad: {
    borderRadius: 8,
    width: 30,
    height: 30,
    border: "none",
    outlineColor: "none",
    outlineStyle: "none",
    outlineWidth: "none",
    alignItems: "center",
    justifyContent: "center",
  },

  cantidad: {
    width: 30,
    textAlign: "center",
    alignItems: "center",
  },
});

export default function CarritoItem({ producto, setPrecioTotal }) {
  const dispatch = useDispatch();
  const [cantidad, setCantidad] = useState(0);
  const [semiTotal, setSemiTotal] = useState();

  useEffect(() => {
    setCantidad(producto.cantidad);
    setSemiTotal(producto.precio * producto.cantidad);
  }, []);

  function handleSuma(e) {
    if (cantidad >= 1) {
      setCantidad(cantidad + 1);
      setSemiTotal(producto.precio * (cantidad + 1));
      setPrecioTotal((prev) => prev + producto.precio);

      dispatch(agregarCarrito(producto.id, cantidad + 1));
    }
  }

  function handleResta(e) {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      setSemiTotal(producto.precio * (cantidad - 1));
      setPrecioTotal((prev) => prev - producto.precio);

      dispatch(restarCarrito(producto.id, cantidad - 1));
    }
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: producto.imagen }} style={styles.imagen} />

      <View style={styles.containerNombre}>
        <Text style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>${semiTotal}</Text>
      </View>
      <View style={styles.contenedorContador}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? "darkgrey"
                : "rgba(194, 194, 194, 0.69)",
            },
            styles.botonCantidad,
          ]}
          // style={styles.botonCantidad}

          onPress={(e) => {
            e.preventDefault();
            handleResta(e);
          }}
        >
          <Text style={{ color: "black" }}>-</Text>
        </Pressable>
        <Text style={styles.cantidad}>{cantidad}</Text>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? "darkgrey"
                : "rgba(194, 194, 194, 0.69)",
            },
            styles.botonCantidad,
          ]}
          // style={styles.botonCantidad}
          onPress={(e) => {
            e.preventDefault();
            handleSuma(e);
          }}
        >
          <Text style={{ color: "black" }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}
