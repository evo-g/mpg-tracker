import React, { useState } from 'react';
import './style.css';

function App() {
  const [trip, setTrip] = useState(0);
  const [miles, setMiles] = useState(0);
  const [mpgs, setMpgs] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    let temp = miles / trip;
    setMpgs(`This trip you got ${temp.toFixed(2)} miles per gallon.`);
    setTrip(0);
    setMiles(0);
  }

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
    </div>
  );
};

export default App;
