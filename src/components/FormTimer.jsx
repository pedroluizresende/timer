import React, { useContext, useEffect, useState } from 'react'
import { TimerContext } from '../context/TimerProvider';

function FormTimer() {
  const [preview, setPreview] = useState('00:00')
  const [timerInput, setTimerInput] = useState('');
  const [ isDisabled, setIsDisabled] = useState(true)
  const [ background, setBackground] = useState(true)
  const {setTimerValue, isRunning, setIsRunning } = useContext(TimerContext)
  const [ isBigger, setIsBigger ] = useState(false)


  const setInPreview = () => {
    const mins = (+timerInput.split('m')[0])
    const seconds = (+timerInput.split('m')[1].split('s')[0])
    setPreview(`${mins.toString().padStart(2, '0')}:${seconds
      .toString().padStart(2, '0')}`)
  }

useEffect(() =>{
  const regex = /^\d+m\d+s$/
  if(regex.test(timerInput)) {
    setIsDisabled(false)
    setBackground(true)
    setInPreview()
  } else {
    setIsDisabled(true)
    setBackground(false)
    setPreview('00:00')
  }
  if(timerInput === '') {
    setBackground(true)
  }
},[timerInput])


  const handleChangle = ({target}) => {
    setTimerInput(target.value)
  }

  const clickChange = () => {
    const mins = (+timerInput.split('m')[0])
    const seconds = (+timerInput.split('m')[1].split('s')[0])
    if(mins > 59 || seconds > 59) {
      setIsBigger(true)
      setTimerInput('')
      setIsDisabled(true)
    } else {
      setTimerValue({mins, seconds})
      setIsBigger(false)
      setTimerInput('')
      setIsDisabled(true)
      setIsRunning(true)
    }
      
  }

  if(isRunning) {
    return(
      <button 
        type="button"
        onClick={ () => {
          setIsRunning(false)
          setTimerValue({mins: 0, seconds: 0})
        }}
      >
          Stop
      </button>
    )
  }

  return (
    <>
    {
      !isRunning &&  <h2>{ preview }</h2> 
    }
   
    <form>
      <input
        type="text"
        name="timeInput"
        placeholder="ex: 2m3s"
        value={ timerInput }
        onChange={ handleChangle }
        style={ { 
          backgroundColor: background ? 'white' : 'lightcoral'
         } }
      />
      {
        isBigger &&  <span>minutos e segundos não podem ultrapassar 59</span>
      }
     
      <button
        type='button'
        disabled={ isDisabled }
        onClick={ clickChange }
      >
        Start
      </button>
      <section className='options-btn'>
      <button
        type='button'
        onClick={ () => {
          setTimerInput('5m0s')
        } }
      >
        5 min
      </button>
      <button
        type='button'
        onClick={ () => {
          setTimerInput('10m0s')
        } }
      >
       10 min
      </button>
      <button
        type='button'
        onClick={ () => {
          setTimerInput('15m0s')
        } }
      >
        15 min
      </button>
      <button
        type='button'
        onClick={ () => {
          setTimerInput('30m0s')
        } }
      >
        30 min
      </button>
      </section>
    </form>
    </>
  )
}

export default FormTimer