import React from "react";
import "components/DayListItem.scss";

import classNames from "classnames";

//helper function
   const formatSpots = (spots) => {
    if (spots === 0) return "no spots remaining";
    if (spots === 1) return "1 spot remaining";
    return `${spots} spots remaining`;
   };

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props

  let dayClass = classNames('day-list__item', 
      { 'day-list__item--selected': selected, 
      'day-list__item--full': spots === 0
   });


  return (
    <li className={dayClass} onClick={() => setDay(name)} data-testid="day">
      <h2>{name}</h2> 
      <h3>{formatSpots(spots)}</h3>
    </li>
  );
}