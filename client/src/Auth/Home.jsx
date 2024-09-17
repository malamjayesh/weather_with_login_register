import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { RiLoader2Line } from "react-icons/ri";
import axios from "axios";

function Home() {
  const [city, setCity] = useState("keshod");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("tokem");
    alert("You Are Loggedout");
    navigate("/login");
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  function handleChange(e) {
    const value = e.target.value;
    setCity(value);
    if (value.length === 0) {
      setWeather(null);
    }
  }

  const fetchApiData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=df2f503867389950a27144949aaa636f`
      );
      setWeather(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  function handleClick() {
    fetchApiData();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
      <header className="mb-8 flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
          Weather App
        </h1>
        <button
          className="text-2xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300"
          aria-label="Toggle Theme"
        ></button>
      </header>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Enter The City"
          value={city}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        <button
          onClick={handleClick}
          className="w-full py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        >
          Get Weather
        </button>

        {loading && (
          <div className="flex justify-center mt-4">
            <RiLoader2Line size={50} className="animate-spin text-blue-600" />
          </div>
        )}

        {!loading && weather && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
              City: {weather.data.name}
            </h2>
            <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
              Temp: {Math.round(weather.data.main.temp - 273.15)}°C
            </p>
            <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
              Wind Speed: {weather.data.wind.speed} m/s
            </p>
            <p className="text-lg capitalize text-gray-600 dark:text-gray-400">
              {weather.data.weather[0].description}
            </p>
          </div>
        )}
      </div>
      <button onClick={handleLogout} className="text-red-500 underline">
        Logout
      </button>
    </div>
  );
}

export default Home;
