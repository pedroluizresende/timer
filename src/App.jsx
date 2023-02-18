import FormTimer from './components/FormTimer';
import { useContext, useEffect, useState } from 'react';
import { TimerContext } from './context/TimerProvider';
import beepSound from './audio/beep.mp3'
import alarmSound from './audio/alarm.mp3'

function App() {
  const [timer, setTimer] = useState(null)
  const { timerValue, isRunning, setIsRunning,
     ending, setEnding} = useContext(TimerContext)
  const [remainingTime, setRemainingTime] = useState(0);
  const [finish, setFinish] = useState(false)

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
      setEnding({
        isEnding: false,
        timer: 6,
      })
      setIsRunning(false)
      setFinish(true)
    } else if (remainingTime <= 5) {
      setEnding({
        isEnding: true,
        timer: remainingTime,
      })
      const beep = new Audio(beepSound);
      beep.volume = 0.5;
      beep.play();
    }
  }

  }, [remainingTime])

   return (
    <>
    <main
     style={
      {
        filter: finish ? 'blur(5px)': 'none',
      }
     }
    >
      <h1>Temporizador</h1>
    <div className='timer-container'>
        {
          isRunning && 
          <h2
          style={{
            color: ending.timer < 6 ? '#c32f27': '#243e36',
            animation: ending.isEnding ? 'mudanca 1s infinite': 'none'
          }}
          >{ timer }</h2>
        }     
    <FormTimer/>
    </div>
    
    </main>
    <div id='time-is-ending'
      onClick={ () => {
        setFinish(false)
      }}
      style={{
        display: finish ? 'flex' : 'none'
      }}
    >
      <i id="close-icon"
       className="fa-solid fa-xmark"></i>
      <i id="clock-icon" className="fa-solid fa-stopwatch"></i>
      <h2> O tempo acabou !!!</h2>
    </div>
    </>
  );
}

export default App;
 