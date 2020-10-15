import React from 'react';
import Swal from 'sweetalert2';

function Menu(){
    let aboutClick = () =>
    {
        return Swal.fire({
        title: 'About',
        html: 'This was a project made by <b>Amelia V.</b><br/>It shows the weather at your location.<br/>'+
        'If your browser cannot detect your location, a default location is used to request the data. <br/>'+
        'The project uses OpenWeather API. If the API unreachable, hardcoded data will be shown.',
        icon: 'info',
        confirmButtonText: '<i className="icon thumbs up"></i> Ok'
        })
    }
    return (
        <div className="ui centered grid">
            <div className="right aligned column">
                <div className="ui teal inverted compact menu">
                    <div className=" item">
                        <h4><i className="umbrella icon"></i> Weather App</h4>
                    </div>
                    <div className="item">
                        <div className="ui teal button" onClick={aboutClick}>About</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Menu;