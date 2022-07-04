import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Carrousel, NavBar, Bienvenida } from "../index";
import { getProductos } from "../../../redux/actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    marginTop: 2,
  },

  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  productosTitulo: {
    fontSize: 18,
    fontFamily: "Poppins-M",
    color: "#222",
    fontWeight: "700",
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 10,
    width: "90%",
    textAlign: "left",
  },

  containerProductos: {
    height: 250,
  },

  imagen: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    padding: 10,
    marginTop: 15,
  },

  nombre: {
    fontSize: 15,
    fontFamily: "Poppins-M",
    color: "#222",

    textAlign: "center",
    margin: 10,
  },

  precio: {
    fontSize: 15,

    fontWeight: "700",
    marginLeft: 15,
    marginTop: 5,
  },

  descripcion: {
    fontSize: 13,
    textAlign: "center",
  },
});

// const width = Dimensions.get("window").width;
const ANCHO_CONTENEDOR = 150;

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const productos = useSelector((state) => state.productos);
  const [loading, setLoading] = useState(true);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   // console.log(isFocused);
  //   //Update the state you want to be updated
  //   // console.log("rodrigooooo");
  // }, [isFocused]);

  useEffect(() => {
    dispatch(getProductos());
  }, []);

  useEffect(() => {
    if (productos[0]) {
      setLoading(false);
    }
  }, [productos]);

  return (
    <>
      <NavBar screen={isFocused ? "Inicio" : ""} flag={false} />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="brown"
          />
        ) : (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Bienvenida />
            <Carrousel />

            <Text style={styles.productosTitulo}>Productos Destacados</Text>

            <Animated.FlatList
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              data={productos
                .filter((producto) => producto.stock > 0)
                .slice(0, 8)}
              keyExtractor={({ id }, index) => id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                marginHorizontal: 15,
              }}
              decelerationRate={0}
              snapToInterval={ANCHO_CONTENEDOR}
              scrollEventThrottle={16}
              style={styles.containerProductos}
              horizontal
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 1) * ANCHO_CONTENEDOR,
                  index * ANCHO_CONTENEDOR,
                  (index + 1) * ANCHO_CONTENEDOR,
                ];

                const outputRange = [-2, -8, 0];

                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange,
                });

                return (
                  <AnimatedPressable
                    onPress={() => {
                      navigation.navigate("DetalleProducto", { id: item.id });
                    }}
                    style={{
                      width: 150,
                      height: "75%",
                      margin: 15,
                      backgroundColor: "white",
                      borderRadius: 10,

                      shadowColor: "#000",
                      shadowOffset: {
                        width: 4,
                        height: 0,
                      },
                      shadowOpacity: 0.1,
                      shadowRadius: 3,
                      transform: [{ translateY }],
                    }}
                  >
                    <Image
                      source={{ uri: item.imagen }}
                      style={styles.imagen}
                    />
                    <Text style={styles.nombre}>
                      {item.nombre.slice(0, 20)}
                    </Text>
                  </AnimatedPressable>
                );
              }}
            />
          </View>
        )}
      </View>
    </>
  );
}
