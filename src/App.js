import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
// import cities from 'cities.json';
import Weather from './component/weather.component';
import Form from './component/form.component';

const API_key = '507ee3ed9187f853b7a59fce19dbe1a6';

class App extends Component {
  constructor() {
    super();
    this.state={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  };

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  getWeatherIcon(icons, rangeId) {
    switch(true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon: this.weatherIcon.Drizzle});
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({icon: this.weatherIcon.Rain});
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon: this.weatherIcon.Snow});
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon: this.weatherIcon.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({icon: this.weatherIcon.Clear});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon: this.weatherIcon.Clouds});
        break;
      
      default:
        return this.state.icon;
    }
  };

  getWeather = async e => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    try {
      if(city && country) {
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)
  
        const response = await api_call.json();
  
        console.log(response);
    
        this.setState({
          city: `${response.name}, ${response.sys.country}`,
          celsius: this.calCelsius(response.main.temp),
          temp_max: this.calCelsius(response.main.temp_max),
          temp_min: this.calCelsius(response.main.temp_min),
          description: response.weather[0].description,
          error: false,
        });
        this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
      }else{
        this.setState({error: true});
      };
    }
    catch(error) {
      this.setState({error: true});
    }
  };

  render() {
    return (
      <div className="App">
        <Form 
        loadweather={this.getWeather} 
        error={this.state.error}
        />
        <Weather 
        city={this.state.city} 
        country={this.state.country} 
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon}
        />
      </div>
    );
  }
};

export default App;
