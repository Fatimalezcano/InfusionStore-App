import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  StatusBar,
} from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { useDispatch } from "react-redux";
import { postUsuario, setUserInfo } from "../../../redux/actions";
import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { app, authentication } from "../../../firebase";
import { setData } from "../../Functions/localStorage";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  volver: {
    position: "absolute",
    fontSize: 30,
    top: 50,
    left: 30,
    zIndex: 999,
  },

  saludo: {
    position: "absolute",
    top: "10%",
    width: "100%",
    textAlign: "center",
    // left: "35%",
    fontSize: 35,
    fontFamily: "PoppinsM",
    color: "rgba(67, 67, 67, 1)",
  },
  saludo2: {
    position: "absolute",
    top: "15%",
    width: "100%",
    textAlign: "center",
    fontSize: 22,
    fontFamily: "PoppinsR",
    color: "rgba(67, 67, 67, 1)",
    marginTop: 20,
  },

  inputContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    fontFamily: "Poppins",
    fontSize: 15,
    color: "rgba(131, 145, 161, 1)",
  },

  buttonContainer: {
    width: "90%",
    top: "3%",
    left: "5%",
  },

  button: {
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "black",
  },
  textGoogle: {
    position: "absolute",
    bottom: "18%",
    right: "35%",
    fontSize: 15,
    fontFamily: "PoppinsM",
    color: "grey",
  },

  contenedorRegistro: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    bottom: 30,
    left: "20%",
  },
  textRegistro2: {
    fontFamily: "PoppinsR",
    fontSize: 15,
    color: "black",
    marginRight: 10,
  },
  textRegistro: {
    fontFamily: "PoppinsM",
    fontSize: 15,
    color: "darkgrey",
  },
});

export default function SignUp({ setIsAuthenticated }) {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const navigation = useNavigation();

  const iniciarSesion = () => {
    navigation.navigate("Login");
  };

  const createUser = () => {
    if (nombre && apellido && email && password > 0) {
      app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: nombre,
            })
            .then(() => {
              setIsAuthenticated(true);

              setData("user", {
                nombre: res.user.displayName,
                email: res.user.email,
                uid: res.user.uid,
                photoURL: res.user.photoURL,
              });

              dispatch(
                postUsuario({
                  id: res.user.uid,
                  nombre: res.user.displayName,
                  apellido: apellido,
                  mail: res.user.email,
                  contraseña: password,
                })
              );

              dispatch(
                setUserInfo({
                  displayName: res.user.displayName,
                  email: res.user.email,
                  uid: res.user.uid,
                  photoURL: res.user.photoURL,
                })
              );
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err, "error al crear cuenta");
        });
    } else {
      Alert.alert("Error de registro", "Alguno de los campos está vacío");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <AntDesign
        style={styles.volver}
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.saludo}>¡Hola!</Text>
      <Text style={styles.saludo2}>Registrate para empezar</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
          underlineColor="transparent"
          theme={{ colors: { text: "#222", primary: "transparent" } }}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={(text) => setApellido(text)}
          underlineColor="transparent"
          theme={{ colors: { text: "#222", primary: "transparent" } }}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
          underlineColor="transparent"
          theme={{ colors: { text: "#222", primary: "transparent" } }}
        />
        {!!email.nameError && (
          <Text style={{ color: "red", textAlign: "center" }}>
            {email.nameError}
          </Text>
        )}
        {/* <HelperText type="error" visible={(false, hasErrors)}>
          E-mail no válido
        </HelperText> */}

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={passwordVisible}
          underlineColor="transparent"
          theme={{ colors: { text: "#222", primary: "transparent" } }}
          right={
            <TextInput.Icon
              name={passwordVisible ? "eye" : "eye-off"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={createUser}>
          <Text
            style={{ fontFamily: "PoppinsM", fontSize: 20, color: "white" }}
          >
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.textGoogle}>O registrate con</Text> */}

      <View style={styles.contenedorRegistro}>
        <Text style={styles.textRegistro2}>¿Ya tenés una cuenta?</Text>
        <Pressable onPress={iniciarSesion}>
          <Text style={styles.textRegistro}>Inicia sesion</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
