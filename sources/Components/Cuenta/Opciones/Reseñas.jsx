import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet, Text, Pressable } from "react-native";
// import Cerrar from "../Cerrar";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../../../redux/actions";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    height: "92%",
  },
  cerrar: {
    marginBottom: 60,
  },
  compra: {
    width: "94%",
    display: "flex",
    flexDirection: "column",
    borderColor: "grey",
    borderWidth: 1,
    padding: 15,
    margin: "3%",
    marginTop: 20,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "white",
  },

  producto: {
    // marginLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationColor: "currentcolor",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  dato: {
    marginLeft: 3,
    fontWeight: "500",
  },
});

export default function Reseñas({ setOption }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.userInfo);
  const idUser = userInfo.uid;
  const reseñas = useSelector((state) => state.reviews);
  const productos = useSelector((state) => state.productos);

  useEffect(() => {
    dispatch(getReviews(idUser));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {reseñas ? (
          reseñas.map((reseña) => (
            <View style={styles.compra}>
              {/* <Text style={styles.dato}>{`Reseña: ${reseña.id}`}</Text> */}
              <Pressable
                onPress={() =>
                  navigation.navigate("DetalleProducto", {
                    id: reseña.productoId,
                  })
                }
              >
                <Text style={styles.producto}>
                  Producto:{" "}
                  {
                    productos.filter(
                      (producto) => producto.id === reseña.productoId
                    )[0].nombre
                  }
                </Text>
              </Pressable>
              <Text style={styles.dato}>
                {reseña.puntaje !== 1
                  ? `Puntaje: ${reseña.puntaje} estrellas`
                  : `Puntaje: 1 estrella`}
              </Text>
              <Text style={styles.dato}>Titulo: {reseña.titulo}</Text>
              <Text style={styles.dato}>Comentario: {reseña.comentario}</Text>
            </View>
          ))
        ) : (
          <View style={{ marginTop: "20%", height: "50%" }}>
            <Text>Aún no has hecho reseñas</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
