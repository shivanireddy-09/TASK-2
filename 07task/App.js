import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e849ec378296aae22dc243a8b9d84def`)
      .then((result) => result.json())
      .then((data) => {
        const kelvin = data.main.temp;
        const celsius = kelvin - 273.15;
        setWeatherData(Math.round(celsius));
      });
  };

  return (
    <div className="bg-image">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4">
          <h1 className="text-center mb-4">Weather App</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input type="text" className="form-control" value={city} onChange={changeHandler} placeholder="Enter city" />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Get Weather</button>
            </div>
          </form>

          {weatherData && (
            <div className="weather-card mt-4">
              <h2>Weather in {city}</h2>
              <p>Temperature: {weatherData}°C</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
