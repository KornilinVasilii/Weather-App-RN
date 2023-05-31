import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons"; 
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons"; 
import { SimpleLineIcons } from "@expo/vector-icons"; 
const API_KEY = "f5a3b96ce3554ad29a583456233005";


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
    let lon = location.coords.longitude;
    console.log(lat,lon)
    setLoaded(false);
    const API = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Saint-Petersburg&days=5&aqi=no&alerts=no`;

    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        // console.log(data,'13');
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



  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>
        <SimpleLineIcons name="location-pin" size={20} color="#fff" />
        <Text style={styles.location}>
          {weatherData && weatherData.location.name}
        </Text>
      </View>
      <Text style={styles.date}>
        {weatherData && weatherData.location.localtime}
      </Text>
      <View style={styles.currentWeather}>
        <Text style={styles.tempText}>
          {weatherData && weatherData.current.temp_c}&#xb0;
        </Text>
        <Image
          style={styles.currentWeatherIcon}
          source={{
            uri: "https://cdn.weatherapi.com/weather/128x128/day/116.png",
          }}
        />
      </View>
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
    </View>
  );
}
const styles = StyleSheet.create({
  infoWrapperTitle: {
    color: '#fff',
    fontWeight: '200',
    fontSize: 14,
    textAlign: 'center',
  },
  infoWrapperText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "600",
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 6,
  },
  weatherOtherInfo: {
    width: "100%",
    maxHeight: 120,
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: "#3d3d3d",
    borderRadius: 18,
    marginBottom: 260,
    alignItems: 'center',
  },

  currentWeatherIcon: {
    height: 200,
    width: 200,
    position: 'absolute',
    marginTop: 65,
  },
  currentWeatherInfo: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 20,
  },
  currentWeather: {
    flex: 1,
    alignItems: "center",
    marginTop: 65,
  },
  location: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
  },
  date: {
    marginTop: 8,
    color: '#fff',
    textAlign: 'center',
  },
  current: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
  },
  weatherContainer: {
    flex: 1,
    backgroundColor: "#303030",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 60,
    justifyContent: 'center',
    alignItems: "center",
    gap: 10,
  },
  tempText: {
    fontSize: 120,
    color: "#ffffff",
    textAlign: 'center',
    fontWeight: "600",
    opacity: 0.9,
    zIndex: 2,
  },
  body: {
    flex: 1,
    marginBottom: 40,
    alignItems: "center",
  },
});
