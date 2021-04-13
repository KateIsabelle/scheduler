import React from "react";
import "components/InterviewerListItem.scss";

import classNames from "classnames";

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

export default function InterviewListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props

  let interviewerClass = classNames('interviewers__item', 
      { 'interviewers__item--selected': selected
   });
//    let interviewerImgClass = classNames('interviewers__item', 
//    { 'day-list__item--selected': selected, 
//    'day-list__item--full': spots === 0
// });


  return (
    <li className={interviewerClass} onClick={() => setInterviewer(name)}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {selected ? name : ""}
  </li>
  
  );
}