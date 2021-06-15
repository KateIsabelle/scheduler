import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode])

  //function to transition between visual modes for child components in Appointment
  //adds each mode passed in to the history array -- if 'replace' argument is true, replaces last mode with new mode
  const transition = (newMode, replace = false) => {
    setHistory(prev =>
      replace ? [...prev.slice(0, prev.length - 1), newMode]
      : [...prev, newMode]
    );
    setMode(newMode)
  }
  //function to transition back to last mode in history if action is canceled
  const back = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0,-1);
      setHistory(newHistory)
      setMode(newHistory[newHistory.length - 1])
    }
  }

  return { mode, transition, back }
}
