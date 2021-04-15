import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay } from "../../src/helpers/selectors";


// sample data
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "3pm",
//     interview: {
//       student: "Kate Davis",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Paul Ludd",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "5pm",
//   }
// ];


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState(prev => ({ ...prev, day }));
 
  let dailyAppointments = getAppointmentsForDay(state, state.day)

  useEffect(() => {

    Promise.all([
      axios.get("/api/days"), //array of objects [ {0: {id: 1, name: "Monday", appointments: Array(5), interviewers: Array(5), spots: 3}}...]
      axios.get("/api/appointments"), //object of objects { 1: {id: 1, time: "12pm", interview: {…} ... }
      axios.get("/api/interviewers")
    ])
      .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
        // console.log("Days Response: ", daysResponse.data);
        // console.log("Appts Response: ", appointmentsResponse.data);
        // console.log("Interviewers Response: ", interviewersResponse.data);

        setState(prev => ({...prev, days: daysResponse.data, appointments: appointmentsResponse.data, interviewers: interviewersResponse.data }));
      });
  }, [])

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
