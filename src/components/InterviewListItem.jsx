import React from "react";
import "components/InterviewListItem.scss";

import classNames from "classnames";


export default function InterviewListItem(props) {
  const { name, spots, selected, setDay } = props

  // let dayClass = classNames('day-list__item', 
  //     { 'day-list__item--selected': selected, 
  //     'day-list__item--full': spots === 0
  //  });


  return (
    <li className="interviewers__item">
    <img
      className="interviewers__item-image"
      src="https://i.imgur.com/LpaY82x.png"
      alt="Sylvia Palmer"
    />
    Sylvia Palmer
  </li>
  
  );
}