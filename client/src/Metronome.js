import React, { useState, useEffect, useRef } from 'react';

//need to get working audio file
const beepSound = new Audio('https://www.soundsnap.com/lock_tick');

const Metronome = () => {
  const [bpm, setBpm] = useState(100); // Default BPM
  const [isRunning, setIsRunning] = useState(false); // Track if the metronome is running
  const intervalRef = useRef(null); // Reference to store the interval ID
  let beatNumber = useRef(0);

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
    beatNumber = 1;

    // If the metronome is running, reset the interval with the new BPM
    if (isRunning) {
      clearInterval(intervalRef.current);
      startTickLoop()
    }
  };

  const startTickLoop = () => {
    intervalRef.current = setInterval(() => {
      beatNumber = beatNumber < 4 ? beatNumber+1 : 1;
      let sound = beatNumber == 1 ? 'TICK' : 'tick';
      console.log(sound)
      // beepSound.play().catch((error) => {
      //   console.log("Audio play failed:", error);
      // });
    }, intervalTime);
  }

  return (
    <div className="metronome">
      <h1>MyMetronome</h1>

      {/* BPM Display and Slider */}
      <div>
        <h3>BPM: {bpm}</h3>
        <input
          type="range"
          min="40"
          max="218"
          step="1"
          value={bpm}
          onChange={handleBpmChange}
        />
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
