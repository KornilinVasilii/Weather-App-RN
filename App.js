import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";
const API_KEY = "9aa2147288f20feceb74b453a46ba981";

export default function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
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

  async function fectWeatherData(location) {
    let lat = location.coords.latitude;
    let long = location.coords.longitude;

    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(API);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
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
    console.log(weatherData);
  }, [location]);
  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 35 }}>{weatherData && weatherData.name}</Text>
        <Text style={styles.tempText}>
          {weatherData && weatherData.main.temp.toFixed()}˚
        </Text>
      </View>
      {/* <View style={styles.current}>
        <Image
          style={styles.largeIcon}
          source={{
            uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
          }}
        />
      </View> */}
      <View style={styles.body}>
        <Text style={{ fontSize: 30, marginBottom: 8 }}>
          {weatherData && weatherData.weather[0].main}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Max.:{weatherData && weatherData.main.temp_max.toFixed()}˚, min.:
          {weatherData && weatherData.main.temp_min.toFixed()}˚
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  current: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  largeIcon: {
    width: 300,
    height: 300,
  },
  weatherContainer: {
    flex: 1,
    
  },
  headerContainer: {
    flexDirection: "column",
    marginTop: 130,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tempText: {
    fontSize: 85,
    color: "black",
    marginLeft: 30,
    fontWeight: "300",
  },
  body: {
    flex: 1,
    marginBottom: 40,
    alignItems: "center",
  },

});
