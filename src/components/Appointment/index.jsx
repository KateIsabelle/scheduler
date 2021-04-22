import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "Could not save appointment";
const ERROR_DELETE = "Could not cancel appointment";


export default function Appointment(props) {
  //deconstruct props passed down from Application component
  const { time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  //save a created or edited appointment -- passed in as props for click event
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true))

  }

  //delete button on appointment SHOW mode, transitions to confirm component
  function del() {
    transition(CONFIRM)
  }

  //confirm delete cancels interview in remote and local state and transitions to EMPTY mode
  function confDelete() {
    transition(DELETING, true)
    cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={del}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)} />
      )}
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer && interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)} />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === ERROR_SAVE && (
        <Error
          message={ERROR_SAVE}
          onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={ERROR_DELETE}
          onClose={() => back()} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={confDelete}
          onCancel={() => back(SHOW)} />
      )}

    </article>
  )
}



