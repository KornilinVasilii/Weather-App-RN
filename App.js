import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet,ScrollView } from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons"; 
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons"; 
import { SimpleLineIcons } from "@expo/vector-icons"; 
import { AntDesign } from "@expo/vector-icons";
import Form from "./Form";

const API_KEY = "f5a3b96ce3554ad29a583456233005";


export default function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  //Location get function

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

  //Get weather by location function
  
  async function fectWeatherData(location) {
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    // console.log(lat,lon)
    setLoaded(false);
    const API = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=London&days=5&aqi=no&alerts=no`;

    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        // console.log(data,'13');
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(loaded);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fectWeatherData(location);
  }, [location]);

  //  console.log(weatherData.forecast.forecastday)
  return (
    <View style={styles.weatherContainer}>
      <Form />
      {/* Location */}
      <View style={styles.headerContainer}>
        <SimpleLineIcons name="location-pin" size={20} color="#fff" />
        <Text style={styles.location}>
          {weatherData && weatherData.location.name}
        </Text>
      </View>
      {/* Date */}
      <Text style={styles.date}>
        {weatherData && weatherData.location.localtime}
      </Text>
      {/* current weather */}
      <View style={styles.currentWeather}>
        <Text style={styles.tempText}>
          {weatherData && weatherData.current.temp_c.toFixed()}&#xb0;
        </Text>
        <Text style={styles.currentText}>
          {weatherData && weatherData.current.condition.text}
        </Text>
      </View>
      {/* current weather details */}
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
      {/* daily forecast */}
      <View style={styles.dailyForecast}>
        <View style={styles.dailyForecastTitle}>
          <AntDesign name="calendar" size={24} color="#fff" />
          <Text style={styles.dailyForecastText}>Daily forecast</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {weatherData &&
            weatherData.forecast.forecastday.map((item, index) => {
              let date = new Date(item.date);
              let options = { weekday: "long" };
              let dayName = date
                .toLocaleDateString("en-US", options)
                .split(",")[0];
              return (
                <View key={index} style={styles.forecastDay}>
                  <Text style={{ color: "#fff", fontSize: 18 }}>{dayName}</Text>
                  <Text style={{ color: "#fff", fontSize: 18 }}>
                    {item.day.avgtemp_c.toFixed()}˚
                  </Text>
                  <Text style={{ color: "#fff", fontSize: 18 }}>
                    {item.day.condition.text}
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
  forecastDay: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#3d3d3d",
    borderRadius: 18,
    gap: 3,
    marginRight: 20,
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
  dailyForecast: {
    marginBottom: 70,
  },
  infoWrapperTitle: {
    color: "#fff",
    fontWeight: "200",
    fontSize: 14,
    textAlign: "center",
  },
  infoWrapperText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 6,
  },
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
  currentText: {
    color: "#fff",
    fontSize: 20,
  },
  currentWeatherInfo: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  currentWeather: {
    flex: 1,
    alignItems: "center",
    marginTop: 65,
  },
  location: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },
  date: {
    marginTop: 8,
    color: "#fff",
    textAlign: "center",
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
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  tempText: {
    fontSize: 120,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
});
