import React from 'react';

class WeatherCards extends React.Component {

    convertTime(UNIX_timestamp, typeOfTime=null) {
        let myMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let myDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var a = new Date(UNIX_timestamp * 1000);
        if (typeOfTime === "hours") {
            return a.getHours();
        } else if (typeOfTime === "day") {
            return myDayOfWeek[a.getDay()];
        } else if (typeOfTime === "date") {
            var month = myMonths[a.getMonth()];
            var date = a.getDate();
            var time = a.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            return month + ' ' + date + " " + time;
        } else { return a; }
    }
    getForecast(description, hour) {
        if (description === "overcast clouds" || description === "broken clouds") {
            return ["Cloudy", "cloudy"];
        } else if (description === "few clouds" || description === "scattered clouds") {
            return (hour > 5 && hour < 19) ? ["Partly Cloudy", "partlycloudy"] : ["Partly Cloudy", "partlycloudynight"]
        } else if (description === "clear sky") {
            return (hour > 5 && hour < 19) ? ["Sunny", "sunny"] : ["Clear", "clear"]
        } else if (description.includes("rain") || description.includes("drizzle")) {
            return ["Rain", "rain"];
        } else if(description.includes("snow") || description.includes("sleet")) {
            return ["Snow", "snow"];
        } else if (description.includes("thunderstorm")) {
            return ["Thunderstorm", "thunder"];
        }else {
            return ["Other", "sunny"];
        }
    }
    cardJSX(dt, dayOfWeek, date, imgDescr, temp, descript, cardAmount){
        return (
            <div className={`ui dark card ${cardAmount}`} key={dt}>
                <div className="content">
                    <div className="center aligned header">{dayOfWeek}</div>
                    <div className="center aligned meta"><span className="date">{date}</span></div>
                </div>
                <div className="image"><img alt="weather" src={`images/${imgDescr}.png`}></img></div>
                <div className="content">
                    <a className="center aligned header" href="/">{`${temp} ° F`}</a>
                    <div className="center aligned description"> {descript}</div>
                </div>
            </div>
        )
    }
    renderCards(weatherArray) {
        return weatherArray.map((report) => {
            let dt = report.dt;
            let hours = this.convertTime(dt,"hours");
            let forecast = (this.props.type === "current") ? report.weather : report.weather[0].description;
            let descript = this.getForecast(forecast, hours)[0];
            let imgDescr = this.getForecast(forecast, hours)[1];
            let temp = (this.props.type === "daily") ? report.temp.day : report.temp;
            let singleCard = (this.props.type === "current") ? "centered" : "customcard";
            return this.cardJSX(dt,this.convertTime(dt,"day"),this.convertTime(dt,"date"), imgDescr, temp, descript, singleCard);           
        })
    }
    render () {     
        return (            
            <React.Fragment>
                <div className="row">
                    <div className="two wide column"></div>
                    <div className="twelve wide column">
                        <div className={(this.props.type === "current") ? "ui basic right aligned segment" : "customcardlist"}>
                            {this.renderCards(this.props.weatherArray)}
                        </div>
                    </div>
                    <div className="two wide column"></div>
                </div>
                <div className="extra padded row"><div className="column"></div></div>
                <div className="extra padded row"><div className="column"></div></div>
            </React.Fragment>                     
        )
    }
}
export default WeatherCards;

//for future implementation to get sunrise and sunset to match when the sun and moon images appear
/*
    getSunriseSunset(weatherArray) {
        if (Array.isArray(weatherArray) && weatherArray.length && this.props.type === "current"){
            return (console.log(
                [this.convertTime(weatherArray[0].sunrise, "hours")
                ,this.convertTime(weatherArray[0].sunset, "hours"),
                this.convertTime(weatherArray[0].sunrise) ])
            )
        }
    }
*/