import { createContext, useMemo, useState } from "react";

export const TimerContext = createContext()

function TimerProvider({ children }) {
  const [timerValue, setTimerValue] = useState({mins: 0, secs: 0})
  const [isRunning, setIsRunning] = useState(false)
  const [ending, setEnding] = useState({
    isEnding: false,
    timer: 6,
  })

  const values = useMemo(() => ({
    timerValue,
    setTimerValue,
    isRunning,
    setIsRunning,
    ending,
    setEnding,
  }), [timerValue, isRunning, ending])

  return (
    <TimerContext.Provider value= { values }>
      { children }
    </TimerContext.Provider>
  )
}

export default TimerProvider;