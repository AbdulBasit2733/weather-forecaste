import React, { useEffect, useState } from "react";
import Search from "../Search/Search";

const Weather: React.FC = ({ search, setSearch }) => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${param}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      );
      //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
      const data = await response.json();
      console.log(data, "data");
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error in fetching openWeather data", error);
    }
  }

  async function handleSearch() {
    setLoading(true);
    fetchWeatherData(search);
  }
  useEffect(() => {
    setLoading(true);
    fetchWeatherData(search);
    setLoading(false);
  }, [search]);
  console.log(weatherData);

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div className="text-center text-4xl font-semibold">Loading...</div>
      ) : (
        <div>
          <div className="city-data mb-3">
            <h2>
              {weatherData?.name},<span>{weatherData?.sys?.country}</span>
              <span> {weatherData?.timezone}</span>
            </h2>
          </div>
          <div className="date font-medium italic text-xl">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temprature text-6xl font-bold">
            {weatherData?.main?.temp} °C
          </div>
          <p className="weather-description text-2xl mb-2 font-medium mt-5">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <p className="flex items-center justify-center">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].main === "Clouds" && (
                  <img
                    src="/cloudy.png"
                    className="w-[20vw] h-[20vh] md:w-[8vw] md:h-[16vh]"
                  />
                )
              : " "}
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].main === "Clear" && (
                  <img
                    src="/clear.png"
                    className="w-[20vw] h-[20vh] md:w-[8vw] md:h-[16vh]"
                  />
                )
              : " "}
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].main === "Rain" && (
                  <img
                    src="/rain.png"
                    className="w-[20vw] h-[20vh] md:w-[8vw] md:h-[16vh]"
                  />
                )
              : " "}
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].main === "Drizzle" && (
                  <img
                    src="/drizzle.png"
                    className="w-[20vw] h-[20vh] md:w-[8vw] md:h-[16vh]"
                  />
                )
              : " "}
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].main === "Mist" && (
                  <img
                    src="/fog.png"
                    className="w-[20vw] h-[20vh] md:w-[8vw] md:h-[16vh]"
                  />
                )
              : " "}
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].main === "Haze" && (
                  <img
                    src="/haze.png"
                    className="w-[20vw] h-[20vh] md:w-[8vw] md:h-[16vh]"
                  />
                )
              : " "}
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].main === "Snow" && (
                  <img
                    src="/snow.png"
                    className="w-[20vw] h-[20vh] md:w-[8vw] md:h-[16vh]"
                  />
                )
              : " "}
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].main === "Storm" && (
                  <img
                    src="/storm.png"
                    className="w-[20vw] h-[20vh] md:w-[8vw] md:h-[16vh]"
                  />
                )
              : " "}
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].main === "Smoke" && (
                  <img
                    src="/smoke.png"
                    className="w-[20vw] h-[20vh] md:w-[8vw] md:h-[16vh]"
                  />
                )
              : " "}
          </p>
          <div className="weather-info flex justify-evenly items-center mt-10 px-5 py-0 text-xl font-bold">
            <div className="column1 flex flex-col sm:flex-row items-center">
              <img
                src="/wind.png"
                className="w-[12vw] h-[10vh] lg:w-[5vw] lg:h-[10vh] mb-2 mr-3"
              />
              <div>
                <p className="wind">{weatherData?.wind?.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column1 flex flex-col sm:flex-row items-center ">
              <img
                src="/humidity.png"
                className="w-[12vw] h-[10vh] lg:w-[5vw] lg:h-[10vh] mb-2 mr-3"
              />
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="column1 flex flex-col sm:flex-row items-center ">
              <img
                src="/atmospheric.png"
                className="w-[12vw] h-[10vh] lg:w-[5vw] lg:h-[10vh] mb-2 mr-3"
              />
              <div>
                <p className="humidity">{weatherData?.main?.pressure} Pa</p>
                <p>Pressure</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && !weatherData && (
        <div className="text-center text-red-500">
          Weather data not found for "{search}"
        </div>
      )}
    </>
  );
};

export default Weather;
