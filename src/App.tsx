import React, { useEffect, useState } from "react";
import "./index.css";
interface CityName {
  geoname_id: string;
  ascii_name: string;
  cou_name_en: string;
  population: number;
  timezone: string;
  coordinates: {
    lon: number;
    lat: number;
  };
}

const App = () => {
  const [cities, setCities] = useState<CityName[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://documentation-resources.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&refine=cou_name_en%3A%22India%22"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const citiesData = await response.json();
        console.log(citiesData);
        const cities = citiesData.results as CityName[];
        setCities(cities);
      } catch (error) {
        setError(error.message || "An error occurred");
      }
    };

    fetchCities();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      <div className="h-full w-full">
        <h1 className="text-4xl font-bold text-center my-10">
          Infinite Scroll : Weather Forecast
        </h1>
        <p className="text-3xl font-semibold text-center">
          By: Abdul Basit Khan
        </p>
        <div className=" px-[5rem] mt-[3rem]">
          <table className="table-auto w-full">
            <thead className="bg-blue-300">
              <tr className="">
                <th className="border py-3">City Name</th>
                <th className="border py-3">Country</th>
                <th className="border py-3">Population</th>
                <th className="border py-3">Timezone</th>
                <th className="border py-3">Coordinates</th>
              </tr>
            </thead>
            <tbody className="">
              {cities.map((city) => {
                return (
                  
                  <tr
                    key={city.geoname_id}
                    className="text-center font-semibold text-[14px]"
                  >
                    <td className="border border-slate-300 py-2">
                      {city.ascii_name}
                    </td>
                    <td className="border border-slate-300 py-2">
                      {city.cou_name_en}
                    </td>
                    <td className="border border-slate-300 py-2">
                      {city.population}
                    </td>
                    <td className="border border-slate-300 py-2">
                      {city.timezone}
                    </td>
                    <td className="border border-slate-300 py-2">
                      Lat:{city.coordinates.lat}, Lon:{city.coordinates.lon}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
