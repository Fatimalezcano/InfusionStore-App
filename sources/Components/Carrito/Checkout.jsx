import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";

export default function Checkout() {
  const user = useSelector((state) => state.userInfo);
  const carrito = useSelector((state) => state.carrito);

  let productos = "";

  carrito.map((producto) => {
    if (!productos.length) {
      productos = `${producto.id},${producto.cantidad}`;
    } else {
      productos = `${productos}.${producto.id},${producto.cantidad}`;
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `https://pf-gp1-deploy.vercel.app/checkout?id=${user.uid}&carrito=${productos}`,
        }}
      />
    </SafeAreaView>
  );
}
