import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../../src/helpers/selectors";
import useApplicationData from "../../src/hooks/useApplicationData"

//root component
export default function Application() {
  //imported state and change-state-actions logic
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //getAppointmentsForDay returns an array of appointment objects for matching day
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  //getInterviewersForDay retuns an array of interviewer objects for matching day
  const interviewers = getInterviewersForDay(state, state.day)
  
  //map over appointments array, use getInterview to update the value of interviewer in interview object,
    //for each appointment in array, return an Appointment component passing in props
  const apptList = dailyAppointments.map(appt => {
    const interview = getInterview(state, appt.interview);
    return <Appointment
      key={appt.id}
      id={appt.id}
      time={appt.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        {apptList}

        <Appointment key="last" time="6pm" />
      </section>
    </main>
  );
}
