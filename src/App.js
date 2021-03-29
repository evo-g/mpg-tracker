import React, { useEffect, useState } from 'react';
import './style.css';
import BarChart from './components/BarChart';

function App() {
  const [trip, setTrip] = useState(0);
  const [miles, setMiles] = useState(0);
  const [mpgs, setMpgs] = useState('');
  const [trips, setTrips] = useState([]);

  
  useEffect(() => {
    const json = localStorage.getItem('trips');
    const savedTrips = JSON.parse(json);
    if (savedTrips) {
      setTrips(savedTrips);
    }
  }, []);

  useEffect(()=> {
    let json = JSON.stringify(trips);
    localStorage.setItem('trips', json)
  }, [trips]);
  
  function handleSubmit(e) {
    e.preventDefault();
    let temp = (miles / trip).toFixed(2);
    let time = ` ${new Date()}`;
    setTrips(prev => {
      return [{ miles: temp, time }, ...prev]
    })
    setMpgs(`This trip you got ${temp} miles per gallon.`);
    setTrip(0);
    setMiles(0);
  };

  const deleteTrip = (idToDelete) => {
    console.log(idToDelete);
    const filteredTrips = trips.filter((trips) => trips.time !== idToDelete);
    setTrips(filteredTrips);
  };

  return (
    <div className='container'>
      <h1>Calculate your MPG's</h1>
      <h2>For best results remeber to reset your trip to zero on fill up</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-child'>
          <label>Refilled Gas ⛽️ </label>
          <input
            name='trip'
            inputMode='decimal'
            type='decimal'
            value={trip}
            onChange={() => setTrip(event.target.value)}
          />
        </div>
        <div className='form-child'>
          <label>Mileage 🚗 </label>
          <input
            name='trip'
            inputMode='decimal'
            type='decimal'
            value={miles}
            onChange={() => setMiles(event.target.value)}
          />
        </div>
        <div className='form-child'>
          <button type='submit'>Check MPG's</button>
        </div>
      </form>
      <h3>{mpgs}</h3>
      <BarChart data={trips} />
      <ul>
        {trips.map(item => (
          <li key={item.time}>
            <span> previous mpgs: {item.miles}</span>
            <div>Date & Time: {item.time}</div>
            <button onClick={() => deleteTrip(item.time)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
