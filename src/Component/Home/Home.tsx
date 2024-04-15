import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CityData {
  datasetid: string;
  recordid: string;
  fields: {
    geoname_id: string;
    ascii_name: string;
    population: number;
    cou_name_en: string;
    timezone: string;
    coordinates: [lat: number, lon: number];
  };
}

const Home = () => {
  const [countryData, setCountryData] = useState<CityData[] | null>(null);
  const [cityData, setCityData] = useState<CityData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = cityData?.filter((data) =>
    data.fields.ascii_name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchOpenSoftData = async (param: string) => {
      try {
        let apiUrl = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=1000&facet=country_code&facet=admin1_code&facet=admin2_code&facet=timezone&refine.population>=1000`;
        if (param) {
          apiUrl += `&refine.country_code=${param.toUpperCase()}`;
        }
        const result = await fetch(apiUrl);
        const jsonData = await result.json();
        console.log(jsonData);
        console.log(jsonData.records);
        if (jsonData && jsonData.records) {
          setCountryData(jsonData);
          setCityData(jsonData.records);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error In fetching OpenSoftData:", error);
      }
    };

    fetchOpenSoftData("");
  }, []);

  const handleSearch = () => {
    setCityData(
      (prevData) =>
        prevData &&
        prevData?.filter(
          (item) =>
            item.fields.ascii_name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.fields.cou_name_en.includes(search.charAt(0).toUpperCase()) ||
            item.fields.population.toString().includes(search) ||
            item.fields.timezone.toLowerCase().includes(search.toLowerCase()) ||
            item.fields.coordinates[0].toString().includes(search) ||
            item.fields.coordinates[1].toString().includes(search)
        )
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="main">
      <h1 className="text-6xl font-bold text-indigo-600 text-center my-5">
        OpenDataSoft
      </h1>
      <div className="mx-auto">
        <div className="flex justify-center items-center mt-8 gap-5 mb-1">
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md sm:w-[25rem] w-[18rem]"
            placeholder="Search Here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />
          <button
            className=" bg-indigo-500 text-white px-3
           py-2 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {showSuggestions && (
          <ul className="overflow-auto h-[10rem] border border-gray-400 w-[25rem] ml-[29.2rem] rounded-md">
            {showSuggestions &&
              suggestions?.map((suggestion) => (
                <li
                  onClick={() =>
                    handleSuggestionClick(suggestion.fields.ascii_name)
                  }
                  key={suggestion.fields.geoname_id}
                  className="suggestion hover:bg-gray-200 my-1 pl-3"
                >
                  {suggestion.fields.ascii_name}
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className="mt-10">
        <table className="sm:mx-auto sm:w-[80%] table-fixed">
          <thead className="bg-indigo-300">
            <tr className="border border-indigo-300">
              <th className="py-4">Name</th>
              <th className="py-4">Country</th>
              <th className="py-4">Population</th>
              <th className="py-4">Timezone</th>
              <th className="py-4">Coordinates</th>
            </tr>
          </thead>
          <tbody>
            {cityData &&
              cityData
                .filter((item) => {
                  return (
                    item.fields.ascii_name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    item.fields.cou_name_en
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    item.fields.population.toString().includes(search) ||
                    item.fields.timezone
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    item.fields.coordinates[0].toString().includes(search) ||
                    item.fields.coordinates[1].toString().includes(search)
                  );
                })
                .map((city) => (
                  <tr key={city.recordid} className="text-center">
                    <td className="py-4 cursor-pointer sm:w-[20rem] w-[12rem]">
                      <Link
                        to={`/${city.fields.cou_name_en}/${city.fields.ascii_name}/${city.fields.geoname_id}/${city.fields.ascii_name}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {city.fields.ascii_name}
                      </Link>
                    </td>
                    <td className="py-3 sm:w-[20rem] w-[12rem]">
                      <Link
                        to={`/city/${city.recordid}/${city.fields.ascii_name}`}
                      >
                        {city.fields.cou_name_en}
                      </Link>
                    </td>
                    <td className="py-3 sm:w-[20rem] w-[12rem]">
                      {city.fields.population}
                    </td>
                    <td className="py-3 sm:w-[20rem] w-[12rem]">
                      {city.fields.timezone}
                    </td>
                    <td className="py-3 sm:w-[20rem] w-[12rem]">
                      lat: {city.fields.coordinates[0]}, lon:{" "}
                      {city.fields.coordinates[1]}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
