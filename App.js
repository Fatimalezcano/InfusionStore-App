import { Provider } from "react-redux";
import store from "./redux/store/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Login,
  SignUp,
  Home,
  Tienda,
  Favoritos,
  Cuenta,
  DetalleProducto,
  Carrito,
  Checkout,
  PreLogin,
} from "./sources/Components/index.js";
import {
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  LogBox,
} from "react-native";
import { useState, useEffect } from "react";

// ICONOS - Libreria: https://icons.expo.fyi

import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import * as LocalAuthentication from "expo-local-authentication";
import { setData, getData } from "./sources/Functions/localStorage";
import * as Font from "expo-font";

// Ignore log notification by message
LogBox.ignoreLogs(["Warning: ..."]);
//Ignore all log notifications
LogBox.ignoreAllLogs();

const DismissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const fetchFonts = async () => {
  await Font.loadAsync({
    Poppins: require("./assets/fonts/Poppins-Thin.ttf"),
    PoppinsM: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsR: require("./assets/fonts/Poppins-Regular.ttf"),
  });
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [flag, setFlag] = useState(false);

  StatusBar.setBarStyle("dark-content", true);

  useEffect(() => {
    fetchFonts();

    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatible);

      const user = await getData("user");

      if (user && Object.keys(user).length > 0) {
        setFlag(true);
      }
    })();
  }, []);

  const onAuth = () => {
    if (isBiometricAvailable) {
      LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Touch ID",
        fallbackLabel: "Enter Password",
      }).then((result) => {
        setIsAuthenticated(result.success);
      });
    } else {
      //google Sign in
    }
  };

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Store"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home-variant-outline"
                size={28}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Tienda"
          component={Tienda}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="store" size={19} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Favoritos"
          component={Favoritos}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-sharp" size={24} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Cuenta"
          children={() => <Cuenta setIsAuthenticated={setIsAuthenticated} />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <DismissKeyboard>
        {isAuthenticated ? (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="HomeTabs" component={HomeTabs} />
              <Stack.Screen
                name="DetalleProducto"
                component={DetalleProducto}
              />
              <Stack.Screen name="Carrito" component={Carrito} />
              <Stack.Screen name="Checkout" component={Checkout} />
            </Stack.Navigator>
          </NavigationContainer>
        ) : (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="PreLogin" component={PreLogin} />
              <Stack.Screen
                name="Login"
                children={() => (
                  <Login
                    flag={flag}
                    onAuth={onAuth}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                )}
              />

              <Stack.Screen
                name="SignUp"
                children={() => (
                  <SignUp
                    onAuth={onAuth}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                )}
              />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </DismissKeyboard>
    </Provider>
  );
}
