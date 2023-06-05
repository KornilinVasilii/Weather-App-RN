import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import DailyForecast from "./components/DailyForecast";
import CurrentWeather from "./components/CurrentWeather";
import SearchWeather from "./components/SearchWeather";

const API_KEY = "f5a3b96ce3554ad29a583456233005";

export default function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);
  useEffect(() => {
    setLoaded(true);
    const DataLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location, "tanusree");
    };

    DataLocation();
  }, []);
  async function fectWeatherData(cityName) {
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    console.log(lat, long, "qw");
    setLoaded(false);
    const API = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}}&days=5&aqi=no&alerts=no`;
    console.log(API);
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        console.log(data, "12");
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fectWeatherData(location);
    console.log(weatherData, "345");
  }, [location]);

  // var date = new Date(weatherData.location.localtime);
  // var options = {
  //   day: "numeric",
  //   weekday: "long",
  //   month: "long",
  // };
  // var dayName = date.toLocaleDateString("en-US", options);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="grey" size={36} />
      </View>
    );
  }
  return (
    <View style={styles.weatherContainer}>
      <SearchWeather
        fectWeatherData={fectWeatherData}
        weatherData={weatherData}
      />
      {/* Date */}
      {/* <Text style={styles.date}>{dayName}</Text> */}
      {/* current weather */}
      <CurrentWeather weatherData={weatherData} />
      {/* current weather details */}
      <WeatherInfo
        weatherData={weatherData}
        fectWeatherData={fectWeatherData}
      />
      {/* daily forecast */}
      <DailyForecast weatherData={weatherData} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    marginTop: 8,
    color: "#fff",
    textAlign: "center",
  },
  weatherContainer: {
    flex: 1,
    backgroundColor: "#303030",
    padding: 20,
  },
});
