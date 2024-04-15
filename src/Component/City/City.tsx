import React from "react";
import Weather from "../Weather/Weather";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const City = () => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="City text-center mt-12 mx-auto w-[90%] max-w-[700px] rounded-lg md:h-full sm:h-fit py-5 px-4 bg-indigo-200 ">
        <Weather
          key={params.geoname_id}
          search={params.name}
          setSearch={params.setName}
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          className="mt-5 bg-indigo-600 text-white px-3 py-2 rounded-lg font-semibold"
          onClick={() => navigate("/")}
        >
          Back To Home
        </button>
      </div>
    </>
  );
};

export default City;
