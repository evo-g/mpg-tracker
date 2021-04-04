import React, { useEffect, useState } from 'react';
import './style.css';
import { Bar } from 'react-chartjs-2';

function App() {
  const [trip, setTrip] = useState(0);
  const [desciption, setDescription] = useState('');
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

  useEffect(() => {
    let json = JSON.stringify(trips);
    localStorage.setItem('trips', json)
  }, [trips]);

  function handleSubmit(e) {
    e.preventDefault();
    let temp = (miles / trip).toFixed(2);
    let time = ` ${new Date()}`;
    setTrips(prev => {
      return [{ miles: temp, time, desciption }, ...prev]
    })
    setMpgs(`This trip you got ${temp} miles per gallon.`);
    setTrip(0);
    setMiles(0);
    setDescription('');
  };

  const deleteTrip = (idToDelete) => {
    const filteredTrips = trips.filter((trips) => trips.time !== idToDelete);
    setTrips(filteredTrips);
  };

  let milesArr = null || trips.map(obj => obj.miles);


  const barData = {
    labels: milesArr,
    datasets: [
      {
        label: 'miles',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: milesArr,
      }
    ]
  };

  return (
    <div className='container'>
      <h1>Calculate your MPG's</h1>
      <h2>Track your fill up's here</h2>
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
          <label>Short Trip Description</label>
          <input
            name='tripDescription'
            type='text'
            value={desciption}
            placeholder='Road trip to...'
            onChange={() => setDescription(event.target.value)}
          />
        </div>
        <div className='form-child'>
          <button type='submit'>Check MPG's</button>
        </div>
      </form>
      <h3>{mpgs}</h3>
      <div className='bar-container'>

        <Bar
          data={barData}

          options={{ maintainAspectRatio: false }}
        />
      </div>
      <ul>
        {trips.map(item => (
          <li key={item.time}>
            <span> previous mpgs: {item.miles}</span>
            <div>Date & Time: {item.time}</div>
            <div>Description: {item.desciption}</div>
            <button onClick={() => deleteTrip(item.time)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
