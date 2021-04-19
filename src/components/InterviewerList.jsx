import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss";

function InterviewerList(props) {
  let { interviewers, value, onChange } = props;

  const list = Array.isArray(interviewers) && interviewers.map(i =>
    <InterviewerListItem 
    key={i.id}
    name={i.name} 
    avatar={i.avatar}
    setInterviewer={() => onChange(i.id)}  
    selected={i.id === value}
  />)

  return (
   
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
       <ul className="interviewers__list">
       { list }
       </ul>
      </section>
      )
      
    }

    InterviewerList.propTypes = {
      interviewers: PropTypes.array.isRequired,
      value: PropTypes.number
    };
   
    export default InterviewerList
    

