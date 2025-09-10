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
    datasets: [{
      label: 'MPG',
      data: milesArr,
      backgroundColor: 'rgba(34,197,94,0.25)',
      borderColor: 'rgba(34,197,94,1)',
      borderWidth: 2,
      borderRadius: 8,
      barThickness: 'flex',
    }]
  };


  return (
    <div className="app">
      <header className="appbar">
        <div className="appbar__inner">
          <div className="appbar__title">MPG Tracker</div>
        </div>
      </header>

      <main className="container">
        <div className="section-label">Add fill-up</div>
        <section className="card">
          <div className="card__headline">
            <span>Calculate MPG</span>
            <span className="card__sub">Quick entry</span>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="control">
              <label className="label">Refilled Gas ⛽️ (gallons)</label>
              <input className="input" type="number" value={trip}
                onFocus={() => trip === 0 && setTrip('')}
                onBlur={() => trip === '' && setTrip(0)}
                onChange={(e) => setTrip(e.target.value)}
              />
            </div>

            <div className="control">
              <label className="label">Mileage 🚗 (miles)</label>
              <input className="input" type="number" value={miles}
                onFocus={() => miles === 0 && setMiles('')}
                onBlur={() => miles === '' && setMiles(0)}
                onChange={(e) => setMiles(e.target.value)}
              />
            </div>

            <div className="control">
              <label className="label">Short Trip Description</label>
              <input className="input" type="text" placeholder="Road trip to…"
                value={description} onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button className="btn" type="submit">Check MPG</button>
          </form>

          {mpgs && <div className="feedback">{mpgs}</div>}
        </section>

        <div className="section-label">MPG trend</div>
        <section className="card chart-card">
          <div className="bar-container">
            <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </section>

        <div className="section-label">History</div>
        <ul className="list">
          {trips.map((item) => (
            <li className="listitem" key={item.time}>
              <div className="listitem__left">
                <div className="listitem__title">{item.description || 'Trip'}</div>
                <div className="listitem__meta">{item.time}</div>
              </div>
              <div className="listitem__action">
                <div className="badge">{item.miles} MPG</div>
                <button className="iconbtn" onClick={() => deleteTrip(item.time)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
