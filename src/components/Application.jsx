import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../../src/helpers/selectors";

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
        setState(prev => ({
          ...prev, 
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data
        }));
      });
  }, [])

  //getAppointmentsForDay returns an array of appointment objects for matching day
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  //getInterviewersForDay retuns an array of interviewer objects for matching day
  const interviewers = getInterviewersForDay(state, state.day)

  //allows us to change the local state when we book an interview
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`api/appointments/${id}`, appointment)
    .then(() => setState({
      ...state,
      appointments
    }))
  }

  //
  function cancelInterview(id) {
  //use appointment id to find the right appointment slot and set it's interview data to null
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
    return axios.delete(`api/appointments/${id}`)
    .then(() => setState({
      ...state,
      appointments
    
    }))
  }

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
