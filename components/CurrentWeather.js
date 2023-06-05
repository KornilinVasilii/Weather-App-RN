import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import SearchWeather from "./SearchWeather";

const CurrentWeather = ({ weatherData }) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <SimpleLineIcons name="location-pin" size={20} color="#fff" />
        <Text style={styles.location}>
          {weatherData && weatherData.location.name}
        </Text>
      </View>
      <View style={styles.currentWeather}>
        <Text style={styles.tempText}>
          {weatherData && weatherData.current.temp_c.toFixed()}&#xb0;
        </Text>
        <Text style={styles.currentText}>
          {weatherData && weatherData.current.condition.text}
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  location: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  currentWeather: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  tempText: {
    fontSize: 120,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    zIndex: 1,
  },
  currentText: {
    color: "#fff",
    fontSize: 20,
  },
});
export default CurrentWeather;
