import React, { useEffect, useState } from 'react';
import './style.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [trip, setTrip] = useState(0);
  const [description, setDescription] = useState('');
  const [miles, setMiles] = useState(0);
  const [mpgs, setMpgs] = useState('');
  const [trips, setTrips] = useState([]);

  // Load trips from localStorage
  useEffect(() => {
    const json = localStorage.getItem('trips');
    const savedTrips = JSON.parse(json);
    if (savedTrips) {
      setTrips(savedTrips);
    }
  }, []);

  // Save trips to localStorage
  useEffect(() => {
    const json = JSON.stringify(trips);
    localStorage.setItem('trips', json);
  }, [trips]);

  function handleSubmit(e) {
    e.preventDefault();
    if (trip === 0 || miles === 0) return;

    const temp = (miles / trip).toFixed(2);
    const now = new Date();
    const time = now.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    setTrips(prev => [{ miles: temp, time, description }, ...prev]);
    setMpgs(`This trip you got ${temp} miles per gallon.`);
    setTrip(0);
    setMiles(0);
    setDescription('');
  }

  const deleteTrip = (idToDelete) => {
    const filteredTrips = trips.filter((t) => t.time !== idToDelete);
    setTrips(filteredTrips);
  };

  const milesArr = trips.map(obj => obj.miles);

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
      <h2>For best results remember to reset your trip to zero on fill up</h2>

      <form onSubmit={handleSubmit}>
        <div className='form-child'>
          <label>Refilled Gas ⛽️</label>
          <input
            type='number'
            value={trip}
            onFocus={() => trip === 0 && setTrip('')}
            onBlur={() => trip === '' && setTrip(0)}
            onChange={(e) => setTrip(e.target.value)}
          />
        </div>

        <div className='form-child'>
          <label>Mileage 🚗</label>
          <input
            type='number'
            value={miles}
            onFocus={() => miles === 0 && setMiles('')}
            onBlur={() => miles === '' && setMiles(0)}
            onChange={(e) => setMiles(e.target.value)}
          />
        </div>

        <div className='form-child'>
          <label>Short Trip Description</label>
          <input
            type='text'
            placeholder='Road trip to...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='form-child'>
          <button type='submit'>Check MPG's</button>
        </div>
      </form>

      <h3>{mpgs}</h3>

      <div className='bar-container'>
        <Bar data={barData} options={{ maintainAspectRatio: false }} />
      </div>

      <ul>
        {trips.map((item) => (
          <li className='trip-card' key={item.time}>
            <div><strong>Previous MPG:</strong> {item.miles}</div>
            <div><strong>Date & Time:</strong> {item.time}</div>
            <div><strong>Description:</strong> {item.description || '—'}</div>
            <button onClick={() => deleteTrip(item.time)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
