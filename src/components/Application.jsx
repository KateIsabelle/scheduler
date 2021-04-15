import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay } from "../../src/helpers/selectors";

/// application component:
export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  
  useEffect(() => {
    //api requests for getting days/appointments/interviewers data
    Promise.all([
      axios.get("/api/days"), 
      axios.get("/api/appointments"), 
      axios.get("/api/interviewers")
    ]) // destructure responses and update state:
    .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
      setState(prev => ({...prev, days: daysResponse.data, appointments: appointmentsResponse.data, interviewers: interviewersResponse.data }));
    });
  }, [])
  console.log("state.days", state.days)
  console.log("state.interviewers", state.interviewers)
  console.log("state.appointments", state.appointments)
  //getAppointmentsForDay returns an array of appointment objects for matching day
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const apptList = dailyAppointments.map(appt =>
    <Appointment
      key={appt.id}
      {...appt}
    />)

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
