import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

// kanjibu dek component li sawablna kayjib lik Geolocalisation 
import useGeolocalisation from './useGeolocalisation';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    // hna dekchi li jayab mn component Ghadi N7atu f const ula variable li 7biti
    let geoLocation = useGeolocalisation();
    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchWeather(query);

            setWeather(data);
            setQuery('');
        }
    }

    return (
        <div className="main-container">
            {/*******  hnaya fin kaynfe3 loaded ila kan true kayaficher kiya dek objet li jay sinon DIk dededededede li chfti 9bayla HAHAHAHAHHAH*/}
            <div className="GeoInfo">{geoLocation.loaded? JSON.stringify(geoLocation):"dededed"}</div>
            <input type="text"className="search"placeholder="Search..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        
        </div>
    );
}

export default App;