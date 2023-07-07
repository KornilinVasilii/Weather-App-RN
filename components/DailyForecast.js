import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function DailyForecast({ weatherData }) {
  return (
    <View style={styles.dailyForecast}>
      <View style={styles.dailyForecastTitle}>
        <AntDesign name="calendar" size={24} color="#fff" />
        <Text style={styles.dailyForecastText}>Daily forecast</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {weatherData &&
          weatherData.forecast.forecastday.map((item, index) => {
            let date = new Date(item.date);
            let options = { weekday: "short" };
            let dayName = date
              .toLocaleDateString("en-US", options)
              .split(",")[0];
            return (
              <View key={index} style={styles.forecastDay}>
                <Text style={{ color: "#fff", fontSize: 18 }}>{dayName}</Text>
                <Image
                  style={{ height: 55, width: 55 }}
                  source={require("../assets/clouds-and-sun.png")}
                ></Image>
                <Text style={{ color: "#fff", fontSize: 22, marginLeft: 6 }}>
                  {item.day.avgtemp_c.toFixed()}˚
                </Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  dailyForecast: {
    marginBottom: 70,
  },
  dailyForecastTitle: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  dailyForecastText: {
    color: "#fff",
    alignItems: "center",
  },
  forecastDay: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#3d3d3d",
    borderRadius: 18,
    gap: 3,
    marginRight: 20,
  },
});

export default DailyForecast;
