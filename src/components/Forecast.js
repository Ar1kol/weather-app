import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const Forecast = ({ forecastData }) => {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayOfTheWeek = new Date().getDay();
  const forecastDays = weekDays
    .slice(dayOfTheWeek, weekDays.length)
    .concat(weekDays.slice(0, dayOfTheWeek));

  console.log(forecastDays);

  return (
    <>
      <label className="forecast-title">Daily</label>
      <Accordion className="forecast-accordion" allowZeroExpanded>
        {forecastData.list.splice(0, 14).map((item, i) => (
          <AccordionItem key={item.dt + i}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    src={`icons/${item.weather[0].icon}.png`}
                    className="forecast-icon"
                  />
                  <label className="forecast-day">
                    {forecastDays[i >= 7 ? i - 7 : i]}
                  </label>
                  {/* <label className="forecast-details">
                    more details
                  </label> */}
                  <label className="forecast-description">
                    {item.weather[0].description}
                  </label>
                  <label className="forecast-min-max">
                    {item.main.temp_min.toFixed(1)}°C /{" "}
                    {item.main.temp_max.toFixed(1)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label className="daily-details-label">Pressure</label>
                  <label className="daily-details-value">
                    {item.main.pressure} hPa
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-label">Humidity</label>
                  <label className="daily-details-value">
                    {item.main.humidity}%
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-label">Clouds</label>
                  <label className="daily-details-value">
                    {item.clouds.all}%
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-label">Wind Speed</label>
                  <label className="daily-details-value">
                    {item.wind.speed} m/s
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-label">See Level</label>
                  <label className="daily-details-value">
                    {item.main.see_level}m
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label className="daily-details-label">Feels Like</label>
                  <label className="daily-details-value">
                    {item.main.feels_like.toFixed(1)}°C
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
