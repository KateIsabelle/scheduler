import React from "react";
import DayListItem from "components/DayListItem"

export default function DayList(props) {
  const { days, day, setDay } = props;

  const list = days.map(d =>
    <DayListItem 
    key={d.id}
    name={d.name} 
    spots={d.spots} 
    selected={d.name === day}
    setDay={setDay}  
  />)

  return (
    <ul>
    { list }
    </ul>
  )

}