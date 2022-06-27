import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 90,
    // height: 25,
    marginLeft: -3,
    borderRadius: 5,
    position: "relative",
  },

  Star: {
    fontSize: 18,
  },

  emptyStar: {
    color: "white",
  },

  fullStar: {
    color: "yellow",
  },
});

export default function StarRating({ rating }) {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <View
            key={index}
            style={[index <= rating ? styles.fullStar : styles.emptyStar]}
          >
            <Text
              style={[
                styles.Star,
                index <= rating ? styles.fullStar : styles.emptyStar,
              ]}
            >
              &#9733;
            </Text>
          </View>
        );
      })}
    </View>
  );
}
