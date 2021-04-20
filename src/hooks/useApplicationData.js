import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { actions } from "@storybook/addon-actions";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

//helper function for updating spots when interviews are canceled or booked
function updateSpots(state, change) {
  const days = [...state.days].map(day => ({ ...day }));
  const matchDayObj = days.filter((day) => state.day === day.name)[0]
  matchDayObj.spots += change
  return days
}

function reducer(state, action) {
  if (action.type === SET_DAY) {
    return {
      ...state, 
      day: action.day}
  }

  if (action.type === SET_APPLICATION_DATA) {
    return {
      day: state.day,
      days: action.days,
      appointments: action.appointments,
      interviewers: action.interviewers
    }
  }

  if (action.type === SET_INTERVIEW) {
    const { id, interview } = action

    const appointment = {
      ...state.appointments[id],
      interview: interview ? { ...interview } : null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //check if this interview slot was previously filled or null in state
    const oldInterview = state.appointments[id].interview
    //check if interview slot is filled or null in action
    const newInterview = interview
    const days = (oldInterview && newInterview) ? updateSpots(state, 0) 
      : (oldInterview ? updateSpots(state, 1) 
      : updateSpots(state, -1))

    return {
      ...state,
      appointments, 
      days
    }
  }
  throw new Error(
    `Tried to reduce with unsupported action type: ${action.type}`
  );
}

//separation of state and actions used to change state -- to be used in Application component
export default function useApplicationData() {

const [state, dispatch] = useReducer(reducer, {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
})

  const setDay = day => dispatch( { type:SET_DAY, day } )

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]) 
      .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
        dispatch({ 
          type: SET_APPLICATION_DATA, 
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data
        })
      });
  }, [])

  function bookInterview(id, interview) { 
    const appointment = {
      ...state.appointments[id],
      interview: interview ? { ...interview } : null
    };
    return axios.put(`api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ 
          type: SET_INTERVIEW, 
          id, 
          interview })
      })
  }

  function cancelInterview(id) {
    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        dispatch({ 
          type: SET_INTERVIEW, 
          id, 
          interview: null})
      })
    }
    return {
      state,
      setDay,
      bookInterview,
      cancelInterview
    };
}


 
