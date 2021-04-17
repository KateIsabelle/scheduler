import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode])

  const transition = (newMode, replace = false) => {
    setHistory(prev =>
      replace ? [...prev.slice(0, prev.length - 1), newMode]
      : [...prev, newMode]
    );
    setMode(newMode)
  }

  const back = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0,-1);
      setHistory(newHistory)
      setMode(newHistory[newHistory.length - 1])
    }
  }

  return { mode, transition, back }
}

// if (replace) {
//   const newHistory = [...history]
//   newHistory.pop()
// } else {
//   setHistory([...history, newMode])
// }

// if (history.length > 1) {
//   const newHistory = [...history]
//   newHistory.pop()
//   setHistory(newHistory)
//   setMode(newHistory[newHistory.length - 1])
// }