import { View, Text, StyleSheet } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import SearchWeather from "./SearchWeather";

const WeatherInfo = ({ weatherData, fectWeatherData }) => {
  // const {
  //   current: { humidity },
  // } = weatherData;
  return (
    <View style={styles.weatherOtherInfo}>
      <View style={styles.infoWrapper}>
        <Fontisto
          style={{ textAlign: "center" }}
          name="wind"
          size={24}
          color="#fff"
        />
        <Text style={styles.infoWrapperText}>
          {weatherData && weatherData.current.wind_mph.toFixed()} m/s
        </Text>
        <Text style={styles.infoWrapperTitle}>Wind</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Entypo
          style={{ textAlign: "center" }}
          name="drop"
          size={24}
          color="#fff"
        />
        <Text style={styles.infoWrapperText}>
          {weatherData && weatherData.current.humidity}%
        </Text>
        <Text style={styles.infoWrapperTitle}>Humidity</Text>
      </View>
      <View style={styles.infoWrapper}>
        <FontAwesome
          style={{ textAlign: "center" }}
          name="thermometer-2"
          size={24}
          color="#fff"
        />
        <Text style={styles.infoWrapperText}>
          {weatherData && weatherData.current.feelslike_c}˚
        </Text>
        <Text style={styles.infoWrapperTitle}>Feels like</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  weatherOtherInfo: {
    width: "100%",
    maxHeight: 120,
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#3d3d3d",
    borderRadius: 18,
    marginBottom: 40,
    alignItems: "center",
  },
  infoWrapperText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 6,
  },
  infoWrapperTitle: {
    color: "#fff",
    fontWeight: "200",
    fontSize: 14,
    textAlign: "center",
  },
});

export default WeatherInfo;
