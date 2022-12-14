const CurrentWeather = ({ weatherData }) => {
  return (
    <div className="weather-container">
      <div className="weather-section">
        <div>
          <p className="weather-city">{weatherData.city}</p>
          <p className="weather-description">
            {weatherData.weather[0].description}
          </p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${weatherData.weather[0].icon}.png`}
        />
      </div>
      <div className="weather-section">
        <p className="weather-temperature">{`${weatherData.main.temp.toFixed(
          1
        )}°C`}</p>
        <div className="weather-details">
          <div className="parameeter-row">
            <span className="parameeter-label">Details</span>
          </div>
          <div className="parameeter-row">
            <span className="parameeter-label">Feels like</span>
            <span className="parameeter-value">
              {weatherData.main.feels_like.toFixed(1)}°C
            </span>
          </div>
          <div className="parameeter-row">
            <span className="parameeter-label">Wind</span>
            <span className="parameeter-value">
              {weatherData.wind.speed} m/s
            </span>
          </div>
          <div className="parameeter-row">
            <span className="parameeter-label">Humidity</span>
            <span className="parameeter-value">
              {weatherData.main.humidity}%
            </span>
          </div>
          <div className="parameeter-row">
            <span className="parameeter-label">Pressure</span>
            <span className="parameeter-value">
              {weatherData.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
