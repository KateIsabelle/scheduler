import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(props.id, interview)
      .then(() => transition(SHOW))
    
  }

  function del() {
    transition(DELETING)
    cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={del}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers={interviewers}
        onSave={save} 
        onCancel={() => back(EMPTY)} />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}


    </article>
  )
}


// { interview ? <Show student={interview.student} interviewer={interview.interviewer.name } /> : <Empty />}
