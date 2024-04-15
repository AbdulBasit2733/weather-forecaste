import React, { useEffect, useState } from "react";
import Search from "../Search/Search";

const Weather: React.FC<{ search: string; setSearch: React.Dispatch<React.SetStateAction<string>> }> = ({ search, setSearch }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const weatherIcons = {
    Clouds: "/cloudy.png",
    Clear: "/clear.png",
    Rain: "/rain.png",
    Snow: "/snow.png"
  };

  async function fetchWeatherData(param: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${param}&appid=f01165b22328ce37d2107cb0f0be4ec3`
      );
      const data = await response.json();
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (error) {
      setError("Unable To fetch Data");
      setLoading(false);
      console.error("Error in fetching openWeather data", error);
    }
  }

  const handleSearch = async () => {
    setLoading(true);
    await fetchWeatherData(search);
  };

  useEffect(() => {
    fetchWeatherData(search);
  }, [search]);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

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
          {weatherData && (
            <>
              <div className="city-data mb-3">
                <h2>
                  {weatherData.name}, <span>{weatherData.sys.country}</span>
                  <span> {weatherData.timezone}</span>
                </h2>
              </div>
              <div className="date font-medium italic text-xl">
                <span>{getCurrentDate()}</span>
              </div>
              <div className="temprature text-6xl font-bold">
                {weatherData.main.temp} °C
              </div>
              <p className="weather-description text-2xl mb-2 font-medium mt-5">
                {weatherData.weather[0].description}
              </p>
              <div className="flex items-center justify-center">
                {weatherData.weather[0].main in weatherIcons && (
                  <img
                    src={weatherIcons[weatherData.weather[0].main]}
                    alt={weatherData.weather[0].main}
                    className="w-[20vw] h-[20vh] md:w-[8vw] md:h-[16vh]"
                  />
                )}
              </div>
              <div className="weather-info flex justify-evenly items-center mt-10 px-5 py-0 text-xl font-bold">
                <div className="column1 flex flex-col sm:flex-row items-center">
                  <img
                    src="/wind.png"
                    alt="Wind Speed"
                    className="w-[12vw] h-[10vh] lg:w-[5vw] lg:h-[10vh] mb-2 mr-3"
                  />
                  <div>
                    <p className="wind">{weatherData.wind.speed} km/h</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
                {/* Add more weather info here */}
              </div>
            </>
          )}
          {!loading && !weatherData && (
            <div className="text-center text-red-500">
              Weather data not found for "{search}"
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Weather;
