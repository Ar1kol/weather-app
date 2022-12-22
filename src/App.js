import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Header from "./components/Header";
import MyGradient from "./components/MyGradient";
import Search from "./components/Search";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");

    const fetchCurrentWeather = fetch(
      `${process.env.REACT_APP_WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );
    const fetchForecast = fetch(
      `${process.env.REACT_APP_WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );

    Promise.all([fetchCurrentWeather, fetchForecast])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="app-container">
      {/* <Header /> */}

      {/* <MyGradient /> */}
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather weatherData={currentWeather} />}
      {forecast && <Forecast forecastData={forecast} />}
    </div>
  );
}

export default App;
