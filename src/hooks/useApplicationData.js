import React, { useState, useEffect } from "react";
import axios from "axios";

//separation of state and actions used to change state -- to be used in Application component
export default function useApplicationData() {

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


  //allows us to change the local and remote state when we book an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //print a days array copy for updating spots
    const days = [...state.days].map(day => ({ ...day }));
    //find matching day object 
    const matchDayObj = days.filter((day) => state.day === day.name)[0]
    //decrement available spots
    matchDayObj.spots--

    return axios.put(`api/appointments/${id}`, appointment)
      .then(() => setState({
        ...state,
        appointments,
        days
      }))
  }

  //use appointment id to find the right appointment slot and set it's interview data to null
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //print a days array copy for updating spots
    const days = [...state.days].map(day => ({ ...day }));
    //find matching day object 
    const matchDayObj = days.filter((day) => state.day === day.name)[0]
    //increment available spots
    matchDayObj.spots++

    return axios.delete(`api/appointments/${id}`)
      .then(() => setState({
        ...state,
        appointments,
        days
      })
      )

  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}