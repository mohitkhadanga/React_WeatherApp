import React, { useEffect, useState } from "react";
import "./css/styles.css";

const OuterBox = () => {
  const [cityData, setCityData] = useState(null);
  const [search, setSearch] = useState("Bhubaneshwar");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=a4d32895286589fdbe88603186ba77c0`;
      const response = await fetch(url);

      if (response.ok) {
        const resjson = await response.json();
        setCityData(resjson);
      } else {
        // City not found, set cityData to null
        setCityData(null);
      }
    };

    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box-container">
        <div className="inner-box">
          <input
            placeholder="Enter City Name"
            type="search"
            className="inputField"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          ></input>
        </div>

        {/* Conditional rendering for city not found */}
        {!cityData ? (
          <p>City Not Found</p>
        ) : (
          // Display weather information if the city is found
          <div className="info">
            <h2 className="location">{cityData.name}</h2>
            <h1 className="temperature">{cityData.main.temp}° Cel</h1>
            <h3 className="min-max-temp">
              Min : {cityData.main.temp_min}° Cel | Max : {cityData.main.temp_max}° Cel
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default OuterBox;
