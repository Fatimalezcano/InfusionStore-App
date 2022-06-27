import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { StarRating } from "../index";

const styles = StyleSheet.create({
  reviewContainer: {
    width: 280,
    height: 150,
    padding: 20,
    margin: 20,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    zIndex: 1000,
  },
  datos: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  texto: {
    color: "white",
  },
  fecha: {
    color: "white",
    position: "absolute",
    top: 2,
    left: 160,
  },
});

const Reviews = (props) => {
  return (
    <>
      {props.state && (
        <>
          <View style={styles.reviewContainer}>
            <View style={styles.datos}>
              <Text style={styles.titulo}>{props.titulo}</Text>
              <Text style={styles.fecha}>{props.fecha}</Text>
            </View>
            {props.puntaje && <StarRating rating={props.puntaje} />}
            {props.comentario && (
              <Text style={styles.texto}>{props.comentario}</Text>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default Reviews;
