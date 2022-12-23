import { useState, useEffect, memo } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hue, setHue] = useState(null);

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
    setHue(random(1, 360));
  };

  const ORB_COUNT = 20;

  const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const iterate = (count, mapper) =>
    [...new Array(count)].map((_, i) => mapper(i));
  const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

  const Gooey = ({ id }) => (
    <filter id={id}>
      <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -5"
        result="goo"
      />
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
  );

  const Blur = ({ id }) => (
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
    </filter>
  );

  const Gradient = ({ id, hue }) => {
    const h = hue + random(-40, 40);
    const f = [h, 80, 60];
    const t = [h + 20, 100, 30];
    return (
      <linearGradient id={id} x1="70%" x2="0%" y1="70%" y2="0%">
        <stop
          offset="0%"
          stopColor={`hsl(${t[0]},${t[1]}%,${t[2]}%)`}
          stopOpacity="1"
        />
        <stop
          offset="100%"
          stopColor={`hsl(${f[0]},${f[1]}%,${f[2]}%)`}
          stopOpacity="1"
        />
      </linearGradient>
    );
  };

  const Orb = ({ hue }) => {
    const r = random(30, 100);
    const from = [random(0 - r, 1000 + r), random(0 - r, 1000 + r)];
    const to = [random(0 - r, 1000 + r), random(0 - r, 1000 + r)];
    const d = distance(from, to);
    const id = random(0, 1000);
    return (
      <>
        <circle
          className="gradient-circle"
          cx={from[0]}
          cy={to[0]}
          r={r}
          fill={`url(#grad-${id})`}
          style={{
            "--duration": `${d / 15}s`,
            "--from-x": from[0],
            "--from-y": from[1],
            "--to-x": to[0],
            "--to-y": to[1],
          }}
        />
        <Gradient id={`grad-${id}`} hue={hue} />
      </>
    );
  };

  const Orbs = memo(({ hue }) => {
    return (
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMinYMin slice"
        style={{
          background: `linear-gradient(hsl(${hue},${80}%,${90}%), hsl(${hue},${100}%,${80}%))`,
        }}
      >
        <g filter="url(#blur)">
          <g filter="url(#gooey)">
            {iterate(ORB_COUNT, (i) => (
              <Orb key={i} hue={hue} />
            ))}
          </g>
        </g>
        <defs>
          <Gooey id="gooey" />
          <Blur id="blur" />
        </defs>
      </svg>
    );
  });

  useEffect(() => {
    console.log(currentWeather);
    console.log(forecast);
  });

  return (
    <>
      {hue && <Orbs hue={hue} />}
      <div className="gradient-banner">
        <h1 className="gradient-title">Generative Gradient Blobs</h1>
        <button className="gradient-button" style={{ "--hue": hue }}>
          Regenerate
        </button>
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather weatherData={currentWeather} />}
        {forecast && <Forecast forecastData={forecast} />}
      </div>
    </>
  );
}

export default App;
