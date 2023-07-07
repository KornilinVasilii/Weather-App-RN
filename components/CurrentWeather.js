import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const CurrentWeather = ({ weatherData }) => {
  // let date = new Date(weatherData.location.localtime);
  // let options = {
  //   day: "numeric",
  //   month: "long",
  //   weekday: "long",
  // };
  // let dayName = date.toLocaleDateString("en-US", options);

  return (
    <>
      <View style={styles.headerContainer}>
        <SimpleLineIcons name="location-pin" size={20} color="#fff" />
        <Text style={styles.location}>
          {weatherData && weatherData.location.name}
        </Text>
      </View>
      {/* <Text style={styles.date}>{dayName}</Text> */}
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
  date: {
    textAlign: "center",
    marginTop: 12,
    color: "#fff",
  },
  location: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 10,
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
