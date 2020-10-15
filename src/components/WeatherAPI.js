import React from 'react';
import axios from 'axios';
import WeatherCards from './WeatherCards';

class WeatherAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            city: 'Unknown City', country: 'Unknown Country', errorMessage: '', 
            noLocMsg: '', hourlyWeather: [], currentWeather: [], dailyWeather: []
        };
    };
    getLocalresponse(err) {
        this.setState({
            currentWeather: this.props.currentForecast,
            dailyWeather: this.props.dailyForecast,
            hourlyWeather: this.props.hourlyForecast,
            city:'Merrifield',country:'US',noLocMsg:"Using cached data.",
            errorMessage: err
        });
    }
    getAPIresponse(lat, long) {
        let baseUrl = "https://api.openweathermap.org/data/2.5/";
        let apiKey = "13225715ae7ca76fee401e51d3ed6692";
        let apiUrl = baseUrl+"onecall?lat="+lat+"&lon="+long+"&units=imperial&exclude=minutely,alerts&appid="+apiKey;
        axios.get(apiUrl).then(response => {   
                this.setState({
                    currentWeather: [{
                        dt:response.data.current.dt,temp:response.data.current.temp,
                        weather:response.data.current.weather[0].description,
                        sunrise: response.data.current.sunrise, sunset: response.data.current.sunset}],
                    dailyWeather: response.data.daily.slice(0, 5),
                    hourlyWeather: response.data.hourly.slice(0, 5)
                });
            }, err => {
                //console.log("Weather API request "+ err) //Error
                this.getLocalresponse(err);
        })
        let otherApiUrl = baseUrl+"forecast?lat="+lat+"&lon="+long+"&appid="+apiKey;
        axios.get(otherApiUrl).then(response => {           
                this.setState({ city: response.data.city.name, country: response.data.city.country})               
            }, err => {
                //console.log("Weather API request "+ err) //Error
                this.getLocalresponse(err);
        })
    }
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(    //gets coordinates from user's browser
            (position) => {           
                this.getAPIresponse(position.coords.latitude, position.coords.longitude);//success
            }, 
            (err) => {
                //console.log("No coordinates yet "+err );
                this.setState({noLocMsg: "Default location", errorMessage: err});
                this.getAPIresponse(37.774929, -122.419416);
            }
        )
    };
    render() {   
        return (
            <React.Fragment>
                <div className="row"><div className="column">
                    <div className="ui basic right aligned segment">
                        {this.state.city}, {this.state.country}
                        <i className="map marker alternate icon"></i>
                        <br/>{this.state.noLocMsg}
                    </div>
                </div></div>
                <WeatherCards weatherArray={this.state.currentWeather} type="current"/>
                <div className="extra padded row"><div className="column">
                    <div className="ui large header center aligned">5-Hour Forecast</div>
                </div></div>
                <WeatherCards weatherArray={this.state.hourlyWeather} type="hourly"/>
                <div className="row"><div className="column">
                    <div className="ui large header center aligned">5-Day Forecast</div>
                </div></div>
                <WeatherCards weatherArray={this.state.dailyWeather} type="daily"/>
            </React.Fragment>
        );
    }
}

export default WeatherAPI;