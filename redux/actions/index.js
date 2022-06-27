import axios from "axios";

const urlBase = "https://proyecto-final-gp1.herokuapp.com/";

export function getProductos() {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${urlBase}productos`);

      dispatch({ type: "GET_PRODUCTOS", payload: resp.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setProductosFiltrados(productosFiltrados = [], text = "") {
  return function (dispatch) {
    dispatch({
      type: "SET_PRODUCTOS_FILTRADOS",
      payload: { productosFiltrados, text },
    });
  };
}

// export function getDetail(id) {
//   return function (dispatch) {
//     axios(`${urlBase}producto/${id}`).then((res) =>
//       dispatch({ type: "GET_DETAIL", payload: res.data })
//     );
//   };
// }

// export function clearDetail() {
//   return function (dispatch) {
//     dispatch({ type: "CLEAR_DETAIL" });
//   };
// }

// export function getCategorias() {
//   return async function (dispatch) {
//     try {
//       const resp = await axios.get(`${urlBase}${categorias}`);

//       if (resp) {
//         dispatch({ type: "GET_CATEGORIAS", payload: resp.data });
//       }
//     } catch (err) {
//       console.log(err, "error categorias");
//     }
//   };
// }

// export function searchProduct(name) {
//   return async function (dispatch) {
//     let json = await axios.get(`${urlBase}${productos}?name=${name}`);
//     return dispatch({
//       type: "SEARCH_PRODUCTS",
//       payload: json.data,
//     });
//   };
// }

// export function filtrarCategorias(payload) {
//   return {
//     type: "FILTRAR_CATEGORIAS",
//     payload,
//   };
// }

export function getReviews(id) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${urlBase}ratings/usuario/${id}`);

      if (resp) {
        dispatch({ type: "GET_REVIEWS", payload: resp.data });
      }
    } catch (err) {
      console.log(err, "error reviews");
    }
  };
}

export function getProductReviews(id) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${urlBase}ratings/${id}`);

      if (resp) {
        dispatch({ type: "GET_PRODUCT_REVIEWS", payload: resp.data });
      }
    } catch (err) {
      console.log(err, "error reviews");
    }
  };
}

// export function getAllReviews() {
//   return async function (dispatch) {
//     try {
//       const resp = await axios.get(`${urlBase}ratings/`);

//       if (resp) {
//         dispatch({ type: "GET_ALL_REVIEWS", payload: resp.data });
//       }
//     } catch (err) {
//       console.log(err, "error AllReviews");
//     }
//   };
// }

// export function deleteReview(id) {
//   return async function (dispatch) {
//     await axios.delete(`${urlBase}ratings/${id}`);
//     dispatch(getAllReviews());
//     return dispatch({
//       type: "DELETE_REVIEW",
//     });
//   };
// }

// export function postProducto(payload) {
//   return async function (dispatch) {
//     // let json = await axios.post(`${urlBase}${admin}${crear}`, payload);

//     // dispatch({ type: "POST_PRODUCTO", payload: json.data });

//     axios.post(`${urlBase}${admin}${crear}`, payload).then((res) => {
//       dispatch({
//         type: "POST_PRODUCTO",
//         payload: res.data,
//         categorias: payload.categorias,
//       });
//     });
//   };
// }

// export function postPedido(body) {
//   return function (dispatch) {
//     axios.post(`${urlBase}${pedido}${crear}`, body).then((res) => {
//       // console.log(res, "aca?");
//       dispatch({ type: "POST_PRODUCTO", payload: res.data });
//     });
//   };
// }

// export function putProducto(id, body) {
//   return function (dispatch) {
//     axios.put(`${urlBase}${admin}${id}`, body).then((res) => {
//       dispatch({ type: "PUT_PRODUCTO", payload: res.data });
//     });
//   };
// }

// export function deleteProducto(id) {
//   return function (dispatch) {
//     axios
//       .delete(`${urlBase}producto/${id}`)
//       .then((res) => {
//         dispatch({ type: "DELETE_PRODUCTO", payload: res.data });
//       })
//       .catch((err) => console.log(err, "error delete"));
//   };
// }

// export function postCategoria(payload) {
//   return async function (dispatch) {
//     let json = await axios.post(`${urlBase}${categorias}/${crear}`, payload);

//     dispatch(getCategorias());

//     return json;
//   };
// }

// export function deleteCategoria(id) {
//   return async function () {
//     await axios.delete(`${urlBase}${categorias}/${id}`);
//     return function (dispatch) {
//       dispatch({ type: "DELETE_CATEGORIA" });
//     };
//   };
// }

// export function postReviews(id, payload) {
//   return async function (dispatch) {
//     await axios.post(`${urlBase}${ratings}${crear}/${id}`, payload);

//     return dispatch({
//       type: "CREAR_REVIEW",
//       payload,
//     });
//   };
// }

export function enviarConsulta(payload) {
  return async function (dispatch) {
    await axios.post(`${urlBase}usuario/contacto`, payload);
    return dispatch({
      type: "ENVIAR_CONSULTA",
    });
  };
}

export const setSort = (value) => (dispatch) => {
  dispatch({ type: "SET_SORT", payload: value });
};

// export function setCarrito(carrito) {
//   return function (dispatch) {
//     dispatch({ type: "SET_CARRITO", payload: carrito });
//   };
// }

// export function addCarrito(carrito) {
//   return function (dispatch) {
//     dispatch({ type: "ADD_CARRITO", payload: carrito });
//   };
// }

export function agregarCarrito(idProducto, cantidad) {
  return function (dispatch) {
    dispatch({ type: "AGREGAR_CARRITO", payload: { idProducto, cantidad } });
  };
}

export function restarCarrito(idProducto, cantidad) {
  return function (dispatch) {
    dispatch({ type: "RESTAR_CARRITO", payload: { idProducto, cantidad } });
  };
}

export function quitarItem(idProducto) {
  return function (dispatch) {
    dispatch({ type: "QUITAR_ITEM", payload: idProducto });
  };
}

// export function getUser(mail) {
//   return function (dispatch) {
//     try {
//       axios(`${urlBase}usuarios`).then((res) =>
//         dispatch({ type: "GET_USER", payload: res.data, mail })
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };
// }

export function setUserInfo(user) {
  user.photoURL = user.photoURL
    ? user.photoURL
    : "https://media.istockphoto.com/photos/business-cat-holding-cup-of-coffee-picture-id1146568863?b=1&k=6&m=1146568863&s=170667a&w=0&h=4DeWiqNA4Yso9OTispYgvLw6rzPt2x8WwFXRolwXnac=";

  return function (dispatch) {
    try {
      dispatch({ type: "SET_USER", payload: user });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUsuarios() {
  return function (dispatch) {
    try {
      axios(`${urlBase}usuarios`).then((res) =>
        dispatch({ type: "GET_USUARIOS", payload: res.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function postUsuario(body) {
  return function (dispatch) {
    axios
      .post(`${urlBase}crear`, body)
      .then((res) => dispatch({ type: "POST_USUARIO", payload: res.data }));
  };
}

// export function changeUserMode(userInfo) {
//   const user = { ...userInfo };

//   user.visualizacion = user.visualizacion === "admin" ? "user" : "admin";

//   return function (dispatch) {
//     try {
//       dispatch({
//         type: "CHANGE_MODE",
//         payload: user,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// }

export function getPedidos() {
  return function (dispatch) {
    try {
      axios(`${urlBase}pedidos`).then((res) =>
        dispatch({ type: "GET_PEDIDOS", payload: res.data })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

// export function getDetalleEnvio(id) {
//   return async function (dispatch) {
//     let envio = await axios.get(`${urlBase}${pedido}${id}`);
//     return dispatch({ type: "GET_DETALLE_ENVIO", payload: envio?.data });
//   };
// }

// export function actualizarEstadoEnvio(id, payload, productos) {
//   return async function (dispatch) {
//     await axios.put(`${urlBase}${admin}${pedido}${id}`, payload).then((res) => {
//       res.data.productos = productos;
//       dispatch({ type: "ACTUALIZAR_ESTADO", payload: res.data });
//     });
//   };
// }

export function getFavoritos(id) {
  return async function (dispatch) {
    try {
      const favoritos = await axios.get(`${urlBase}favoritos/wishlist/${id}`);
      dispatch({ type: "GET_FAVORITOS", payload: favoritos.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function añadirAFavoritos(productoFav) {
  return function (dispatch) {
    dispatch({ type: "AÑADIR_A_FAVORITOS", payload: productoFav });
  };
}

export function eliminarDeFavoritos(productoFav) {
  return function (dispatch) {
    dispatch({ type: "ELIMINAR_DE_FAVORITOS", payload: productoFav });
  };
}

// export function enviarMail(userMail) {
//   // const user = { ...userInfo };
//   // const usuario = user.multiFactor.user.email;
//   return async function (dispatch) {
//     await axios
//       .post(`${urlBase}usuario/confirmacion`, { mail: userMail })
//       .catch((err) => {
//         console.log(err);
//       });
//     dispatch({ type: "ENVIAR_MAIL", payload: userMail });
//   };
// }

// export function orderByStock(payload) {
//   return { type: "ORDER_BY_STOCK", payload };
// }

// export function mailAdmin(userId, { estado }) {
//   // console.log(userId, estado, "mirar aca!");
//   return async function (dispatch) {
//     if (estado === "En preparación") {
//       await axios
//         .post(`${urlBase}usuario/confirmacion`, { userId: userId })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//     if (estado === "En camino") {
//       await axios
//         .post(`${urlBase}${admin}despachar`, { userId: userId })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//     if (estado === "En punto de entrega/poder del correo") {
//       await axios
//         .post(`${urlBase}${admin}correo`, { userId: userId })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//     if (estado === "Entregado") {
//       await axios
//         .post(`${urlBase}${admin}entrega`, { userId: userId })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//     dispatch({ type: "ENVIAR_MAIL" });
//   };
// }
