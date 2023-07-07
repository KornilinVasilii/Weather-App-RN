import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import WeatherInfo from "./components/WeatherInfo";
import DailyForecast from "./components/DailyForecast";
import CurrentWeather from "./components/CurrentWeather";
import SearchWeather from "./components/SearchWeather";
import HourlyForecast from "./components/HourlyForecast";

const API_KEY = "a5dc866cfff24ccb9f293324231506";

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
    };

    DataLocation();
  }, []);
  async function fectWeatherData(cityName) {

    // let lat = location.coords.latitude;
    // let long = location.coords.longitude;


    setLoaded(false);

    const API = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=5&aqi=no&alerts=no
`;
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
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
  }, [location]);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="grey" size={36} />
      </View>
    );
  }
  return (
    <>
      <View style={styles.weatherContainer}>
        <SearchWeather
          fectWeatherData={fectWeatherData}
          weatherData={weatherData}
        />
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          {/* current weather */}
          <CurrentWeather weatherData={weatherData} />
          {/* current weather details */}

          <WeatherInfo
            weatherData={weatherData}
           
          />
          <HourlyForecast weatherData={weatherData} />
          {/* daily forecast */}
          <DailyForecast weatherData={weatherData} />
          {/* </View> */}
        </ScrollView>
      </View>
    </>
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
