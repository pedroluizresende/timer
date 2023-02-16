import { createContext, useMemo, useState } from "react";

export const TimerContext = createContext()

function TimerProvider({ children }) {
  const [timerValue, setTimerValue] = useState({mins: 0, secs: 0})
  const [isRunning, setIsRunning] = useState(false)

  const values = useMemo(() => ({
    timerValue,
    setTimerValue,
    isRunning,
    setIsRunning,
  }), [timerValue, isRunning])

  return (
    <TimerContext.Provider value= { values }>
      { children }
    </TimerContext.Provider>
  )
}

export default TimerProvider;