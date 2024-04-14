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
  const [error, setError] = useState(null);

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
            item.fields.cou_name_en
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.fields.population.toString().includes(search) ||
            item.fields.timezone.toLowerCase().includes(search.toLowerCase()) ||
            item.fields.coordinates[0].toString().includes(search) ||
            item.fields.coordinates[1].toString().includes(search)
        )
    );
  };

  return (
    <div className="main">
      <h1 className="text-6xl font-bold text-indigo-600 text-center my-5">
        OpenDataSoft
      </h1>
      <div className="">
        <div className="flex justify-center items-center mt-8 gap-5">
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md w-[25rem]"
            placeholder="Search Here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className=" bg-indigo-500 text-white px-3
           py-2 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="mt-10">
        <table className="md:mx-auto sm:w-[80%] table-fixed">
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
                    <td className="py-4 cursor-pointer sm:w-[20rem] w-[15rem]">
                      <Link
                        to={`/${city.fields.cou_name_en}/${city.fields.ascii_name}/${city.fields.geoname_id}/${city.fields.ascii_name}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {city.fields.ascii_name}
                      </Link>
                    </td>
                    <td className="py-3 w-[20rem]">
                      <Link
                        to={`/city/${city.recordid}/${city.fields.ascii_name}`}
                      >
                        {city.fields.cou_name_en}
                      </Link>
                    </td>
                    <td className="py-3 w-[20rem]">{city.fields.population}</td>
                    <td className="py-3 w-[20rem]">{city.fields.timezone}</td>
                    <td className="py-3 w-[20rem]">
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
