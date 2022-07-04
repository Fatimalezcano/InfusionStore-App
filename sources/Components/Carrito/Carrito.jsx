import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  Linking,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import CarritoItem from "./CarritoItem";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { quitarItem } from "../../../redux/actions";
import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  volver: {
    position: "absolute",
    fontSize: 30,
    top: 65,
    left: 30,
    zIndex: 999,
  },

  contenedorTitulo: {},

  titulo: {
    position: "absolute",
    fontSize: 25,
    fontFamily: "Poppins-M",
    top: 65,
    left: "20%",
    // marginBottom: "20%",
  },

  flatlist: {
    position: "relative",
    top: "15%",
    maxHeight: "70%",
    marginBottom: 20,
  },

  productos: {
    display: "flex",
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
  },
  borrar: {
    position: "absolute",
    top: 5,
    right: 5,
    border: "none",
    borderRadius: 8,
    width: 20,
    height: 20,
    alignItems: "center",
  },

  textoCarrito: {
    fontSize: 18,
    fontFamily: "Poppins-M",
    position: "absolute",
    top: "40%",
    margin: 20,
    textAlign: "center",
  },

  contenedorTotal: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    bottom: "3%",
  },
  contenedorPrecio: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  monto: {
    fontFamily: "Poppins-M",
    fontSize: 20,
  },
  botonCompra: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(204, 215, 225, 0.81)",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,

    marginTop: 10,
  },
  textoBoton: {
    fontFamily: "Poppins-M",
    fontSize: 18,
  },
});

export default function Carrito() {
  const navigation = useNavigation();
  const carrito = useSelector((state) => state.carrito);
  const [precioTotal, setPrecioTotal] = useState(0);
  const dispatch = useDispatch();

  function handleQuit(props) {
    Alert.alert(
      "Eliminar producto",
      "¿Estas seguro de eliminar este producto de tu carrito?",
      [
        {
          text: "Si",
          style: "destructive",
          onPress: () => {
            dispatch(quitarItem(props));
            Toast.show({
              position: "top",
              visibilityTime: 1500,
              autoHide: true,
              type: "success",
              text1: "El producto se eliminó con éxito",
              topOffset: 400,
              bottomOffset: 0,
              onShow: () => {},
              onHide: () => {},
            });
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    let precio = 0;

    carrito?.forEach((item) => {
      precio = precio + Number(item.precio) * item.cantidad;
    });

    setPrecioTotal(precio);
  }, [carrito, setPrecioTotal]);

  const handleOnPress = () => {
    navigation.navigate("Checkout");
  };

  return (
    <View style={styles.container}>
      <AntDesign
        style={styles.volver}
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View>
        <Text style={styles.titulo}>Mi Carrito</Text>
      </View>

      <FlatList
        data={carrito}
        keyExtractor={({ id }, index) => id}
        style={styles.flatlist}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.productos}>
              <CarritoItem producto={item} setPrecioTotal={setPrecioTotal} />

              <Pressable
                onPress={() => handleQuit(item)}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? "red"
                      : "rgba(194, 194, 194, 0.69)",
                  },
                  styles.borrar,
                ]}
              >
                <Text
                  style={{
                    color: "grey",
                    fontSize: 12,
                    fontFamily: "Poppins-M",
                  }}
                >
                  x
                </Text>
              </Pressable>
            </View>
          );
        }}
      />

      {/* ACA RENDERIZO EL ALERT TOAST */}
      <Toast />

      {carrito[0] ? (
        <View style={styles.contenedorTotal}>
          <View style={styles.contenedorPrecio}>
            <Text style={styles.monto}>Monto Total:</Text>
            <Text style={styles.monto}>${precioTotal}</Text>
          </View>
          <View>
            <Pressable onPress={handleOnPress} style={styles.botonCompra}>
              <Text style={styles.textoBoton}>Continuar compra</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Text style={styles.textoCarrito}>
          ¡Arrancá añadiendo productos a tu carrito!
        </Text>
      )}
    </View>
  );
}
