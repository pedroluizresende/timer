import FormTimer from './components/FormTimer';
import { useContext, useEffect, useState } from 'react';
import { TimerContext } from './context/TimerProvider';
import beepSound from './audio/beep.mp3'
import alarmSound from './audio/alarm.mp3'

import './App.css'

function App() {
  const [timer, setTimer] = useState(null)
  const { timerValue, isRunning, setIsRunning} = useContext(TimerContext)
  const [remainingTime, setRemainingTime] = useState(0);

  const decreaseTime = () => {
    setRemainingTime(prevTime => prevTime - 1);
  };

  useEffect(() => {
    setRemainingTime(timerValue.mins * 60 + timerValue.seconds);
  }, [timerValue]);

  useEffect(() => {
    let intervalId;

    if(isRunning) {
      intervalId = setInterval(decreaseTime, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isRunning])

  useEffect(() => {
    if(isRunning) {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    setTimer(`${minutes.toString().padStart(2, '0')}:${seconds
      .toString().padStart(2, '0')}`)
    if(remainingTime === 0 ) {
      const alarm = new Audio(alarmSound)
      alarm.volume = 0.5;
      alarm.currentTime = 3;
      alarm.play()

      setIsRunning(false)
    } else if (remainingTime <= 5) {
      const beep = new Audio(beepSound);
      beep.volume = 0.5;
      beep.play();
    }
  }
  }, [remainingTime])


  return (
    <>
    <header>
      <h1>Timer</h1>
    </header>
    <div className='timer-container'>
      {
        isRunning && 
        <h2>{ timer }</h2>
      } 
   
    <FormTimer/>
    </div>
    </>
  );
}

export default App;
