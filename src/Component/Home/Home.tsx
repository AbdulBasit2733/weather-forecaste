// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// interface CityData {
//   datasetid: string;
//   recordid: string;
//   fields: {
//     geoname_id: string;
//     ascii_name: string;
//     population: number;
//     cou_name_en: string;
//     timezone: string;
//     coordinates: [lat: number, lon: number];
//   };
// }

// const Home = () => {
//   const [cityData, setCityData] = useState<CityData[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [search, setSearch] = useState<string>("");
//   const [sorting, setSorting] = useState({
//     cityData: "geoname_id",
//     order: "asc",
//   });

//   async function fetchOpenSoftData(param) {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=1000&facet=country_code&facet=admin1_code&facet=admin2_code&facet=timezone&refine.country_code=${param}&refine.population>=1000`
//       );

//       //https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=1000&facet=country_code&facet=admin1_code&facet=admin2_code&facet=timezone&refine.country_code=IN&refine.population>=1000
//       const data = await response.json();
//       console.log(data.records);
//       if (data && data.records) {
//         setCityData(data.records);
//         setLoading(false);
//       }
//     } catch (error) {
//       setLoading(false);
//       console.log("Error In Fetching Data", error);
//     }
//   }

//   async function handleSearch() {
//     fetchOpenSoftData(search)
//   }

//   useEffect(() => {
//     fetchOpenSoftData("IN");
//   }, []);

//   return (
//     <div className="main">
//       <h1 className="text-6xl font-bold text-indigo-600 text-center my-5">
//         OpenDataSoft
//       </h1>

//       <div className="search-engine w-full flex flex-col space-y-4 justify-around items-center my-10 sm:flex-row sm:space-y-0">
//         <input
//           type="text"
//           className="city-search sm:w-[70%] border rounded-md h-[3rem] py-2 px-5 text-lg outline-none text-indigo-600 font-semibold"
//           placeholder="Enter City Name"
//           name="search"
//           value={search}
//           onChange={(event) => setSearch(event.target.value)}
//         />
//         <button
//           className="search-btn border rounded-lg bg-indigo-600 text-white font-semibold text-lg outline-none sm:px-5 sm:py-2 px-3 py-2"
//           onClick={handleSearch}
//         >
//           Search Weather
//         </button>
//       </div>
//       <div className="mt-20">
//         <table className="md:mx-auto sm:w-[80%] table-auto">
//           <thead className="bg-indigo-300">
//             <tr className="border border-indigo-300">
//               <th className="py-4">Name</th>
//               <th className="py-4">Country</th>
//               <th className="py-4">Population</th>
//               <th className="py-4">Timezone</th>
//               <th className="py-4">Coordinates</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cityData &&
//               cityData
//                 .filter((item) => {
//                   return (
//                     item.fields.ascii_name
//                       .toLocaleLowerCase()
//                       .includes(search) ||
//                     item.fields.cou_name_en
//                       .toLocaleLowerCase()
//                       .includes(search) ||
//                     item.fields.population.toString().includes(search) ||
//                     item.fields.timezone.toLocaleLowerCase().includes(search) ||
//                     item.fields.coordinates[0].toString().includes(search) ||
//                     item.fields.coordinates[1].toString().includes(search)
//                   );
//                 })
//                 .map((city) => (
//                   <tr key={city.datasetid} className="text-center">
//                     <td className="py-4 cursor-pointer sm:w-[20rem] w-[15rem]">
//                       <Link
//                         to={`/city/${city.fields.geoname_id}/${city.fields.ascii_name}`}
//                         className="text-indigo-600 hover:underline"
//                       >
//                         {city.fields.ascii_name}
//                       </Link>
//                     </td>
//                     <Link
//                       to={`/city/${city.recordid}/${city.fields.ascii_name}`}
//                       className=""
//                     >
//                       <td className="py-3 w-[20rem]">
//                         {city.fields.cou_name_en}
//                       </td>
//                     </Link>
//                     <td className="py-3 w-[20rem]">{city.fields.population}</td>
//                     <td className="py-3 w-[20rem]">{city.fields.timezone}</td>
//                     <td className="py-3 w-[20rem]">
//                       lat: {city.fields.coordinates[0]}, lon:{" "}
//                       {city.fields.coordinates[1]}
//                     </td>
//                   </tr>
//                 ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Home;

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
  const [cityData, setCityData] = useState<CityData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sorting, setSorting] = useState({
    cityData: "geoname_id",
    order: "asc",
  });

  async function fetchOpenSoftData(param: string) {
    setLoading(true);
    try {
      let apiUrl = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=1000&facet=country_code&facet=admin1_code&facet=admin2_code&facet=timezone&refine.population>=1000`;

      if (param) {
        apiUrl += `&refine.country_code=${param.toUpperCase()}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data.records);
      if (data && data.records) {
        setCityData(data.records);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error In Fetching OpenSoftData's Data", error);
    }
  }

  // async function handleSearch() {
  //   fetchOpenSoftData(search);
  // }

  const onSearch = (searchTerm) => {
    setSearch(searchTerm);
    fetchOpenSoftData(searchTerm);
    console.log("search", searchTerm);
  };

  useEffect(() => {
    fetchOpenSoftData(search);
  }, []);

  return (
    <div className="main">
      <h1 className="text-6xl font-bold text-indigo-600 text-center my-5">
        OpenDataSoft
      </h1>
      <div className="flex flex-col">
        <div className="search-engine md:w-[60%] mx-auto flex flex-col space-y-4 justify-around items-center my-1 sm:flex-row sm:space-y-0">
          <input
            type="text"
            className="city-search sm:w-[70%] border rounded-md h-[3rem] py-2 px-5 text-lg outline-none text-indigo-600 font-semibold"
            placeholder="Enter Country Code (e.g., IN for India)"
            name="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            className="search-btn border rounded-lg bg-indigo-600 text-white font-semibold text-lg outline-none sm:px-5 sm:py-2 px-3 py-2"
            onClick={() => onSearch(search)}
          >
            Search Cities
          </button>
        </div>
        <div className="dropdown flex flex-col border border-gray-400 md:ml-[19.5rem] ml-[6rem] rounded-md overflow-auto md:w-[37rem] w-[20rem] h-[15rem] ">
          {cityData
            ?.filter((city) => {
              const searchTerm = search.toLowerCase();
              const cityName = city.fields.ascii_name.toLocaleLowerCase();
              const cityCountry = city.fields.cou_name_en.toLocaleLowerCase();
              const cityPopulation = city.fields.population;
              const cityLon = city.fields.coordinates[0];
              const cityLat = city.fields.coordinates[1];
              const cityTimezone = city.fields.timezone;

              return (
                (searchTerm &&
                  cityName.startsWith(searchTerm) &&
                  cityName !== searchTerm) ||
                (cityCountry.startsWith(searchTerm) &&
                  cityCountry !== searchTerm) ||
                (cityPopulation.toString().startsWith(searchTerm) &&
                  cityPopulation.toString() !== searchTerm) ||
                (cityLon.toString().startsWith(searchTerm) &&
                  cityLon.toLocaleString() !== searchTerm) ||
                (cityLat.toString().startsWith(searchTerm) &&
                  cityLat.toLocaleString() !== searchTerm) ||
                (cityTimezone.startsWith(searchTerm) &&
                  cityTimezone !== searchTerm)
              );
            })
            .slice(0, 10)
            .map((city) => (
              <div
                onClick={() =>
                  onSearch(
                    city.fields.ascii_name &&
                      city.fields.coordinates[0] &&
                      city.fields.coordinates[1] &&
                      city.fields.cou_name_en &&
                      city.fields.population &&
                      city.fields.timezone
                  )
                }
                className="dropdown-row cursor-pointer text-start my-[2px] mx-0 hover:bg-slate-200"
                key={city.fields.geoname_id}
              >
                <Link
                  to={`/${city.fields.cou_name_en}/${city.fields.ascii_name}/${city.fields.geoname_id}/${city.fields.ascii_name}`}
                  className="text-gray-500 pl-4"
                >
                  {city.fields.ascii_name ||
                    city.fields.coordinates[0] ||
                    city.fields.coordinates[1] ||
                    city.fields.coordinates[1] ||
                    city.fields.cou_name_en ||
                    city.fields.population ||
                    city.fields.timezone}
                </Link>
              </div>
            ))}
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
                  <tr key={city.datasetid} className="text-center">
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
