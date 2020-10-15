import React from 'react';
import WeatherAPI from './components/WeatherAPI';
import Menu from './components/Menu';
const currentForecast = [{ dt: 1602627220, temp: 66.31, weather: "scattered clouds", sunrise: 1602626400, sunset: 1602640800}];
const hourlyForecast = [
  {"dt": 1602626400, "temp": 64.49, "weather": [{ "description": "scattered clouds" }]},
  {"dt": 1602630000, "temp": 62.65, "weather": [{ "description": "scattered clouds" }]},
  {"dt": 1602633600, "temp": 60.26, "weather": [{ "description": "scattered clouds" }]},
  {"dt": 1602637200, "temp": 58.32, "weather": [{ "description": "clear sky" }]},
  {"dt": 1602640800, "temp": 56.7, "weather": [{ "description": "clear sky" }]}
];
const dailyForecast = [
  {"dt": 1602604800,"temp": {"day": 58.15},"weather": [{ "description": "overcast clouds"}]},
  {"dt": 1602691200, "temp": {"day": 62.6},"weather": [{"description": "clear sky"}]},
  {"dt": 1602777600, "temp": {"day": 66.63},"weather": [{ "description": "clear sky"}]},
  {"dt": 1602864000,"temp": {"day": 50.13},"weather": [{"description": "heavy intensity rain"}]},
  {"dt": 1602950400,"temp": {"day": 52.18}, "weather": [{"description": "light rain"}]}
];
 
function App() {
  return (
  <React.Fragment>
    <Menu/>
    <div className="ui grid"> 
      <WeatherAPI 
        dailyForecast={dailyForecast}
        currentForecast={currentForecast}
        hourlyForecast={hourlyForecast}
      />
    </div>
  </React.Fragment>
  );
}

export default App;
