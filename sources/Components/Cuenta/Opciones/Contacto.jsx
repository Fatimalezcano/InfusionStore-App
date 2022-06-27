import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { enviarConsulta } from "../../../../redux/actions";
// import Cerrar from "../Cerrar";

export default function Contacto({ setOption }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ mail: "", subject: "", text: "" });
  const [errors, setErrors] = useState({ mail: "", text: "" });

  function validate(input) {
    let error = {};
    if (input.mail.length === 0) {
      error.mail = "Debe ingresar un mail";
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.mail)) {
      error.mail = "Debe ingresar un mail valido";
    }
    if (input.text.length === 0) {
      error.text = "Debe completar el campo consulta";
    }
    if (input.text.length < 20) {
      error.text = "La consulta debe ser más específica";
    }
    return error;
  }

  const handleChange = (text, name) => {
    setInput({ ...input, [name]: text });
    setErrors(validate(input));
  };

  function handleSubmit() {
    if (input !== undefined) {
      dispatch(enviarConsulta(input));
      setErrors({ mail: "", consulta: "" });
      setInput({ mail: "", text: "" });
    }
  }

  return (
    <>
      {/* <Pressable style={styles.cerrar} onPress={() => setOption("Cuenta")}>
        <Cerrar />
      </Pressable> */}
      <View style={styles.container}>
        <Pressable onPress={() => setOption("Cuenta")}></Pressable>
        <Text style={styles.title}>Mail:</Text>
        <TextInput
          name="mail"
          placeholder=" Mail"
          style={styles.input}
          value={input.mail}
          onChangeText={(text) => handleChange(text, "mail")}
        />
        <Text style={styles.error}>{errors.mail}</Text>
        <RNPickerSelect
          name="subject"
          id="subject"
          defaultValue="DEFAULT"
          onValueChange={(value) => {
            handleChange(value);
          }}
          value={input.subject}
          items={[
            { label: "Consulta", value: "Consulta" },
            { label: "Reclamo", value: "Reclamo" },
          ]}
        />
        <Text style={styles.title}>Consulta-Reclamo:</Text>
        <TextInput
          miltiline
          name="text"
          placeholder="Texto"
          value={input.text}
          style={[styles.input, styles.textarea]}
          onChangeText={(text) => handleChange(text, "text")}
        />
        <Text style={styles.error}>{errors.consulta}</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.textButton}>ENVIAR</Text>
        </TouchableHighlight>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  error: {
    fontSize: 12,
    color: "red",
  },
  button: {
    backgroundColor: "#CCC",
    textAlign: "center",
    justifyContent: "center",
    paggindTop: 15,
    paggindBottom: 15,
    borderRadius: 5,
    height: 50,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 5,
  },
  textarea: {
    height: 70,
    textAlign: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  cerrar: {
    marginBottom: 60,
  },
});
