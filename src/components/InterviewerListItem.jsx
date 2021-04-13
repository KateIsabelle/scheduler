import React from "react";
import "components/InterviewerListItem.scss";

import classNames from "classnames";

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

export default function InterviewListItem(props) {
  const { key, name, avatar, selected, onChange } = props

  let interviewerClass = classNames('interviewers__item', 
      { 'interviewers__item--selected': selected
   });

  return (
    <li className={interviewerClass} onClick={onChange}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    { selected && name }
  </li>
  
  );
}