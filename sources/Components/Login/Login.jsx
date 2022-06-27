import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/actions";
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
  // btn: {
  //   marginTop: 300,
  //   width: 200,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   alignSelf: "center",
  //   backgroundColor: "#0893FC",
  //   padding: 10,
  //   borderRadius: 5,
  // },

  // text: {
  //   left: "35%",
  //   fontSize: 20,
  // },

  // login: {
  //   color: "#fff",
  //   fontSize: 20,
  //   fontWeight: "500",
  // },

  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },

  volver: {
    position: "absolute",
    fontSize: 30,
    top: 50,
    left: 30,
    zIndex: 999,
  },

  bienvenido: {
    top: "10%",
    width: "100%",
    textAlign: "center",
    // left: "23%",
    position: "absolute",
    fontSize: 35,
    fontFamily: "PoppinsM",
    color: "rgba(67, 67, 67, 1)",
    // textShadowColor: "grey",
    // textShadowOffset: { width: 2, height: 3 },
    // textShadowRadius: 3,
  },
  saludo2: {
    position: "absolute",
    top: "15%",
    textAlign: "center",
    width: "100%",
    // left: "15%",
    fontSize: 22,
    fontFamily: "PoppinsR",
    color: "rgba(67, 67, 67, 1)",
    marginTop: 20,
  },

  inputContainer: {
    top: "30%",
    left: "5%",
    width: "90%",
  },

  input: {
    backgroundColor: "white",

    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    fontFamily: "Poppins",
    fontSize: 18,
    // color: "#222",
  },

  botonOlvidar: {
    top: "30%",
    alignItems: "flex-end",
    marginRight: 20,
  },

  buttonContainer: {
    width: "90%",
    top: "38%",
    left: "10%",
  },

  button: {
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "black",
  },

  // buttonOutline: {
  //   backgroundColor: "white",
  //   marginTop: 5,
  //   borderColor: "#0782F9",
  //   borderWidth: 2,
  // },

  textGoogle: {
    position: "absolute",
    bottom: "22%",
    right: "35%",
    fontSize: 15,
    fontFamily: "PoppinsM",
    color: "grey",
  },
  contenedorRegistro: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",

    width: "100%",

    bottom: "5%",
    left: "12%",
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

export default function Login({ flag, onAuth, setIsAuthenticated }) {
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (flag) {
      onAuth();
    }
  }, [flag]);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    console.log(GoogleAuthProvider, provider, "xd?");
  };

  const registrar = () => {
    navigation.navigate("SignUp");
  };

  const logIn = () => {
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setIsAuthenticated(true);

        setData("user", {
          nombre: res.user.displayName,
          email: res.user.email,
          uid: res.user.uid,
          photoURL: res.user.photoURL,
        });

        dispatch(
          setUserInfo({
            displayName: res.user.displayName,
            email: res.user.email,
            uid: res.user.uid,
            photoURL: res.user.photoURL,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleForgotPass = (e) => {
    e.preventDefault();

    if (email) {
      sendPasswordResetEmail(authentication, email).then(() => {
        setEmail("");
      });
    } else {
      // handleNoEmail();
    }
  };

  return (
    // <View>
    //   <Text style={styles.text}>Si ma re dulce</Text>
    //   <TouchableOpacity onPress={onAuth} style={styles.btn}>
    //     <Text style={styles.login}>Login</Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={() => setIsAuthenticated(true)}
    //     style={styles.btn}
    //   >
    //     <Text style={styles.login}>Login De Pana</Text>
    //   </TouchableOpacity>
    // </View>
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <AntDesign
        style={styles.volver}
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <Text style={styles.bienvenido}>¡Bienvenido!</Text>
      <Text style={styles.saludo2}>Nos alegra verte de nuevo</Text>

      <View style={styles.inputContainer}>
        {/* <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={(text) => setApellido(text)}
        /> */}

        <TextInput
          style={styles.input}
          placeholder="Ingrese e-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
          underlineColor="transparent"
          theme={{ colors: { text: "#222", primary: "transparent" } }}
        />

        <TextInput
          style={styles.input}
          placeholder="Ingrese contraseña"
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

      <Pressable style={styles.botonOlvidar} onPress={handleForgotPass}>
        <Text
          style={{
            fontFamily: "PoppinsR",
            fontSize: 15,
            color: "rgba(115, 115, 115, 1)",
          }}
        >
          ¿Olvidaste la contraseña?
        </Text>
      </Pressable>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={logIn}>
          <Text
            style={{ fontFamily: "PoppinsM", fontSize: 20, color: "white" }}
          >
            Iniciar sesion
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.textGoogle}>O ingresa con</Text> */}

      {/* <FontAwesome
          name="google"
          size={24}
          color="black"
          onPress={googleSignIn}
        /> */}

      <View style={styles.contenedorRegistro}>
        <Text style={styles.textRegistro2}>¿No tenés una cuenta aún?</Text>
        <Pressable onPress={registrar}>
          <Text style={styles.textRegistro}>Registrate acá</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
