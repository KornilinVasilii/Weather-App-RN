import { StyleSheet, TextInput, Text, Button, View } from "react-native";
import { React, useState } from "react";

export default function Form({ addHandler }) {
  const [text, setValue] = useState("");

  const onchange = (text) => {
    setValue(text);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onchange}
        placeholder="Searh city..."
        placeholderTextColor="#666565"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "silver",
    padding: 15,
    width: "100%",
    fontSize: 18,
    marginTop: 40,
    borderRadius: 18,
    opacity: 0.5,
    placeholderColor: 'red',
  },
  button: {},
});
