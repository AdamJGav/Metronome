import React, { useState, useEffect, useRef } from 'react';
import Beat from './Beat';

//need to get working audio file
// const beepSound = new Audio('https://www.soundsnap.com/lock_tick');

const Metronome = () => {
  const [bpm, setBpm] = useState(100); // Default BPM
  const [isRunning, setIsRunning] = useState(false); // Track if the metronome is running
  const intervalRef = useRef(null); // Reference to store the interval ID
  //useState on beatNumber so it can change in child component
  let [beatNumber, setBeatNumber] = useState(1);
  let [totalBeats, setTotalBeats] = useState(4);

  // Calculate the interval time in milliseconds
  let intervalTime = 60000 / bpm;

  // Start the metronome
  const startMetronome = () => {
    if (isRunning) return; // Prevent starting multiple times

    setIsRunning(true);
    startTickLoop()
  };

  // Stop the metronome
  const stopMetronome = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  // Cleanup the interval when the component unmounts
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current); // Clear interval if component is unmounted
    };
  }, []);

  // Handle BPM change
  const handleBpmChange = (event) => {
    const newBpm = event.target.value;
    setBpm(newBpm);
    intervalTime = 60000 / newBpm;
    setBeatNumber(1);

    // If the metronome is running, reset the interval with the new BPM
    if (isRunning) {
      clearInterval(intervalRef.current);
      startTickLoop()
    }
  };

  const startTickLoop = () => {
    setBeatNumber(1);
    let sound = 'TICK';
    intervalRef.current = setInterval(() => {
      setBeatNumber(prevBeatNumber => {
        // Use the previous state value to calculate the next beat
        const nextBeat = prevBeatNumber < 4 ? prevBeatNumber + 1 : 1;
        sound = nextBeat === 1 ? 'TICK' : 'tick';
        return nextBeat
      });
      console.log(sound)
      // beepSound.play().catch((error) => {
      //   console.log("Audio play failed:", error);
      // });
    }, intervalTime);
  }

  return (
    <div className="Metronome">
      <h1>MyMetronome</h1>

      {/* BPM Display and Slider */}
      <div class="container">
        <div class="row py-3 d-inline-flex position-relative">
          {
            Array.from({ length: totalBeats }, (_, index) => (
              <Beat key={index} index={index} beatNumber={beatNumber}></Beat>
            ))
          }
        </div>
        <h3>BPM: {bpm}</h3>
        {/* <h3>Beat Num: {beatNumber}</h3> */}
        <div class="w-75 d-inline-flex position-relative">
        <input
          class="form-range"
          type="range"
          min="40"
          max="218"
          step="1"
          value={bpm}
          onChange={handleBpmChange}
        />
        </div>
      </div>

      {/* Start/Stop Button */}
      <div>
        <button onClick={isRunning ? stopMetronome : startMetronome}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default Metronome;
