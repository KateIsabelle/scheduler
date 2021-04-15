import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode])

  const transition = (newMode, replace = false) => {
    if (replace) {
      const newHistory = [...history]
      newHistory.pop()
      setHistory([...newHistory, newMode]);
    } else {
      setHistory([...history, newMode])
    }
    
    setMode(newMode)
  }

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history]
      newHistory.pop()
      setHistory(newHistory)
      setMode(newHistory[newHistory.length - 1])
    }
  }

  return { mode, transition, back }
}