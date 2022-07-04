import React, {
  useEffect,
  useState,
  createRef,
  useCallback,
  useRef,
} from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  SafeAreaView,
  Animated,
  UIManager,
  LayoutAnimation,
} from "react-native";
import { imagenes } from "./Data";

const width2 = Dimensions.get("window").width;
const height2 = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width2;
const ALTO_CONTENEDOR = height2 * 0.2;
// const ESPACIO = 10;

const styles = StyleSheet.create({
  image: {
    width: ANCHO_CONTENEDOR,
    height: ALTO_CONTENEDOR,
    resizeMode: "cover",
    // resizeMethod: "cover",
    // marginBottom: 10,

    // borderRadius: 15,
  },

  contenedorPaginado: {
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "red",
  },
});

const { width, height } = Dimensions.get("window");

export default function Carrousel() {
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);
  const [dataList, setDataList] = useState(imagenes);
  const [currentIndex, setCurrentIndex] = useState(0);

  let flatList;

  function infiniteScroll(dataList) {
    const numberOfData = dataList.length;
    let scrollValue = 0,
      scrolled = 0;

    setInterval(function () {
      scrolled++;
      if (scrolled < numberOfData) scrollValue = scrollValue + width;
      else {
        scrollValue = 0;
        scrolled = 0;
      }
      flatList &&
        flatList.scrollToOffset({ animated: true, offset: scrollValue });
    }, 3000);
  }
  useEffect(() => {
    setDataList(imagenes);
    infiniteScroll(dataList);
  });

  return (
    <View style={{ width: width2 * 0.98 }}>
      <FlatList
        data={imagenes}
        ref={(ref) => {
          flatList = ref;
        }}
        style={{ borderRadius: 10, marginTop: 2, marginHorizontal: 3 }}
        keyExtractor={(item) => item}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ANCHO_CONTENEDOR}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: ANCHO_CONTENEDOR,
                height: ALTO_CONTENEDOR,
              }}
            >
              <View>
                <Image
                  key={index}
                  source={{
                    uri:
                      item ||
                      "https://educacion30.b-cdn.net/wp-content/uploads/2018/02/mistake.jpg",
                  }}
                  style={styles.image}
                />
              </View>
            </View>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />

      <View style={styles.contenedorPaginado}>
        {imagenes.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={{
                opacity,
                height: 7,
                width: 7,
                backgroundColor: "#595959",
                margin: 8,
                marginTop: 15,
                borderRadius: 5,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
