import React from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const { name, interviewer, interviewers, onSave, onCancel, setInterviewer } = props;

  return (

    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name={name}
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={event => setInterviewer(interviewer.id)}  
        />
      </form>
      <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button confirm onClick={onSave}>Save</Button>
      </section>
    </section>
  </main>

  )

}