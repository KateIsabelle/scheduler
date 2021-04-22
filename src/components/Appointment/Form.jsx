import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;

  //state for student name and interviewer in creating or editing an appointment
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  //error if no interviewer or name is entered before saving appointment
  const [error, setError] = useState("");

  //reset name and interviewer value
  const reset = () => {
    setName("")
    setInterviewer(null)
  }
  //on click cancel button reset values and go back to last mode
  const cancel = () => {
    reset()
    onCancel()
  }
  //on click confirm button, validate that inputs are filled, reset error, and save appointment
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Choose an interviewer");
      return;
    }
    setError("");
    onSave(name, interviewer);
  }

  return (

    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(event) => setName(event.target.value)} 
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>

  )

}
