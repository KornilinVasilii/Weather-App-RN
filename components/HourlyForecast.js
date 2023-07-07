import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function HourlyForecast({ weatherData }) {
  return (
    <View>
      <View style={styles.HourlyForecastTitle}>
        <AntDesign name="clockcircleo" size={24} color="#fff" />
        <Text style={styles.HourlyForecastText}>Hourly Forecast</Text>
      </View>
      <View style={styles.HourlyForecastBlock}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {weatherData &&
            weatherData.forecast.forecastday[0].hour.map((item, index) => {
              let date = new Date(item.time);
              let options = {
                hour12: false,
                hour: "numeric",
                minute: "numeric",
              };
              let dayName = date
                .toLocaleDateString("ru-RU", options)
                .split(" ")[1];
              return (
                <View key={index} style={styles.HourlyForecast}>
                  <Text style={{ color: "#fff" }}>{dayName}</Text>
                  <Image
                    style={{ height: 35, width: 35, marginVertical: 5 }}
                    source={require("../assets/clouds-and-sun.png")}
                  />
                  <Text style={{ color: "#fff" }}>
                    {item.temp_c.toFixed()}˚
                  </Text>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HourlyForecast: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginRight: 20,
  },
  HourlyForecastText: {
    color: "#fff",
  },
  HourlyForecastTitle: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  HourlyForecastBlock: {
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
});

export default HourlyForecast;
