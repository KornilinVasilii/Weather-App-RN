import { StyleSheet, TextInput, View } from "react-native";
import { React, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function SearchWeather({ fectWeatherData }) {
  const [cityName, setCityName] = useState("");

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCityName(text)}
        placeholder="Searh city..."
        placeholderTextColor="#666565"
      />
      <EvilIcons
        style={styles.icon}
        name="search"
        size={44}
        color="#fff"
        onPress={() => fectWeatherData(cityName)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "relative",
    top: 19,
    right: 52,
    opacity: 0.7,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  input: {
    backgroundColor: "#8c8c8c",
    padding: 15,
    width: "100%",
    fontSize: 18,
    marginTop: 40,
    borderRadius: 18,
    color: "#fff",
    
  },
  button: {},
});
