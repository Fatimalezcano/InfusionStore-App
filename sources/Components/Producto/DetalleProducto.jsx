import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addCarrito,
  agregarCarrito,
  restarCarrito,
  eliminarDeFavoritos,
  añadirAFavoritos,
  getProductReviews,
  quitarItem,
} from "../../../redux/actions";
import { StarRating, Reviews } from "../index";

import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
  contProd: {
    width: "100%",
    height: "100%",
    paddingTop: 45,
    position: "relative",
  },

  nombre: {
    fontWeight: "600",
    color: "white",
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 30,
    fontSize: 25,
  },

  descripcion: {
    color: "white",
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
  },

  contFoto: {
    width: "100%",
    height: 500,
    backgroundColor: "white",
    borderRadius: 40,
  },

  img: {
    width: "100%",
    height: 350,
    marginTop: 30,
    resizeMode: "contain",
  },

  contDatos: {
    width: "100%",
    height: 550,
    backgroundColor: "#333334",
    borderRadius: 40,
    paddingTop: "5%",
    display: "flex",
    position: "absolute",
    top: 450,
  },

  volver: {
    position: "absolute",
    fontSize: 30,
    top: 60,
    left: 30,
    zIndex: 9,
  },

  favoritos: {
    position: "absolute",
    fontSize: 30,
    top: 70,
    right: 30,
    zIndex: 999,
  },

  numeros: {
    fontWeight: "bold",
    color: "white",
    margin: 30,
    fontSize: 30,
  },

  botones: {
    position: "absolute",
    bottom: "20%",
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 30,
  },

  cantidad: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  pressable: {
    position: "relative",
    color: "white",
    fontSize: 40,
    textAlign: "center",
    backgroundColor: "#414345",
    width: 60,
    height: 60,
    borderRadius: 15,
    // paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },

  boton: {
    position: "absolute",
    left: "10%",
    top: "10%",
    height: "80%",
    width: "80%",
    color: "white",
    fontSize: 40,
    textAlign: "center",
    backgroundColor: "#414345",
  },

  botonSinStock: {
    position: "relative",
    color: "white",
    fontSize: 40,
    textAlign: "center",
    backgroundColor: "#414345",
    width: "80%",
    height: 60,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    // paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },

  agregar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    width: 180,
    height: 58,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },

  letraBoton: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },

  num: {
    color: "white",
    fontSize: 30,
    margin: 10,
  },

  promedio: {
    marginLeft: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  review: {
    paddingTop: 1,
    fontSize: 14,
    marginLeft: 5,
    color: "white",
    textDecorationLine: "underline",
  },

  revBack: {
    width: "100%",
    height: "200%",
    paddingTop: 200,
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    opacity: 0.98,
    zIndex: 999,
    backgroundColor: "grey",
    overflowY: "scroll",
  },
  cerrarButton: {
    position: "absolute",
    top: 80,
    left: "45%",
  },
  cerrar: {
    fontSize: 26,
    fontWeight: "bold",
    borderColor: "black",
    borderWidth: 3,
    padding: 10,
    borderRadius: 50,
    textAlign: "center",
  },
  sinReseña: {
    fontSize: 26,
    fontWeight: "bold",
  },
});

const DetalleProducto = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const favoritos = useSelector((state) => state.favoritos);
  const reviews = useSelector((state) => state.reviews);
  const [stateReview, setStateReview] = useState(false);
  const carrito = useSelector((state) => state.carrito);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);

  const cantidadCarrito = useSelector(
    (state) => state.carrito?.filter((item) => item.id === id)[0]
  );

  const sumarCarrito = () => {
    if (cantidad < data.stock) {
      setCantidad(cantidad + 1);
      dispatch(agregarCarrito(id, cantidad + 1));
    }
  };

  const restaCarrito = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      dispatch(restarCarrito(id, cantidad - 1));
    }
  };

  function addToCarrito(e) {
    if (data.stock > 0) {
      dispatch(agregarCarrito(id, cantidad));
      Toast.show({
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        type: "success",
        text1: "Producto agregado al carrito",
        topOffset: 100,
        bottomOffset: 20,
        onShow: () => {},
        onHide: () => {},
      });
    }
  }

  //reviews de producto
  useEffect(() => {
    dispatch(getProductReviews(id));
  }, []);

  // Creamos la variable a utilizar
  var rating = 0;

  // Sumarizamos la cantidad de estrellas entre todas las reviews
  reviews[0]
    ? reviews.map((reviews) => (rating += reviews.puntaje))
    : (rating = 1);

  // Dividimos la suma de estrellas por cantidad de review para saber el promedio
  if (reviews.length) {
    rating = rating / reviews.length;
  } else {
    rating = rating / 1;
  }
  // Redondeamos el promedio de estrellas
  rating = Math.round(rating);

  useEffect(() => {
    fetch(`https://proyecto-final-gp1.herokuapp.com/producto/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setCantidad(cantidadCarrito?.cantidad ? cantidadCarrito.cantidad : 1);
  }, [cantidadCarrito]);

  function handleFav() {
    if (favoritos.find((fav) => fav.id == id)) {
      dispatch(eliminarDeFavoritos(id));

      Toast.show({
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        type: "error",
        text1: "Producto eliminado de favoritos",
        topOffset: 100,
        bottomOffset: 0,
        onShow: () => {},
        onHide: () => {},
      });
    } else {
      dispatch(añadirAFavoritos(data));

      Toast.show({
        position: "top",
        visibilityTime: 1500,
        autoHide: true,
        type: "success",
        text1: "Producto agregado a favoritos",
        topOffset: 100,
        bottomOffset: 0,
        onShow: () => {},
        onHide: () => {},
      });
    }
  }

  return !loading ? (
    <View style={styles.contProd}>
      <AntDesign
        style={styles.volver}
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {user && (
        <View style={styles.favoritos}>
          {favoritos.find((fav) => fav.id == id) ? (
            <AntDesign
              onPress={handleFav}
              name="heart"
              size={24}
              color="black"
            />
          ) : (
            <Octicons
              onPress={handleFav}
              name="heart"
              size={24}
              color="black"
            />
          )}
        </View>
      )}

      <View style={styles.contFoto}>
        <Image source={{ uri: data.imagen }} style={styles.img} />
      </View>

      <Toast />
      <View style={styles.contDatos}>
        <Text style={styles.nombre}>{data.nombre}</Text>

        <View style={styles.promedio}>
          <StarRating rating={rating ? rating : 1} />
          <TouchableOpacity onPress={() => setStateReview(!stateReview)}>
            <Text style={styles.review}>({reviews.length} Reviews)</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.descripcion}>{data.descripcion}</Text>
        <Text style={styles.numeros}>${data.precio}</Text>

        {data.stock > 0 ? (
          <View style={styles.botones}>
            <View style={styles.cantidad}>
              <Pressable style={styles.pressable} onPress={restaCarrito}>
                <Text style={styles.boton}>-</Text>
              </Pressable>

              <Text style={styles.num}>{cantidad}</Text>

              <Pressable style={styles.pressable} onPress={sumarCarrito}>
                <Text style={styles.boton}>+</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={(e) => {
                addToCarrito(e);
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? "rgba(194, 194, 194, 0.69)"
                    : "#414345",
                },
                styles.agregar,
              ]}
            >
              <Text style={styles.letraBoton}>Agregar</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.botones}>
            <View style={styles.botonSinStock}>
              <Text style={styles.letraBoton}>Sin Stock</Text>
            </View>
          </View>
        )}
      </View>
      <>
        {stateReview && (
          <View style={styles.revBack}>
            <TouchableOpacity
              style={styles.cerrarButton}
              onPress={() => setStateReview(!stateReview)}
            >
              <Text style={styles.cerrar}>X</Text>
            </TouchableOpacity>
            {reviews.length === 0 ? (
              <Text style={styles.sinReseña}>Aún no hay reseñas</Text>
            ) : (
              reviews?.map((review) => (
                <Reviews
                  key={review.id}
                  state={stateReview}
                  setState={setStateReview}
                  id={review.id}
                  puntaje={review.puntaje}
                  titulo={review.titulo}
                  comentario={review.comentario}
                  fecha={
                    review.updatedAt ? review.updatedAt.slice(0, 10) : "Ahora"
                  }
                />
              ))
            )}
          </View>
        )}
      </>
    </View>
  ) : (
    <></>
  );
};

export default DetalleProducto;
