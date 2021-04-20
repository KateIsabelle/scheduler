import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { actions } from "@storybook/addon-actions";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";


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
    return {
      ...state,
      appointments
    }
  }

  return state;
}

//separation of state and actions used to change state -- to be used in Application component
export default function useApplicationData() {

const [state, dispatch] = useReducer(reducer, {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
})

//function from Francis' lecture
  // const updateSpots = (state) => {
  //   const newState = {...state}
  //   //find day object in days array that matches current day 
  //   const currentDay = state.days.find(day => day.name === state.day)
  //   //find array of appointment id's in day object for current day 
  //   const listOfAppointmentsForDay = currentDay.appointments
  //   //find out how many appointment objects in state have interview: null
  //   const emptyAppointments = listOfAppointmentsForDay.filter(appointmentId => state.appointments[appointmentId].interview === null)
  //   //how many empty appointments in array 
  //   const numberOfSpots = emptyAppointments.length
  //   //update spots
  //   currentDay.spots = numberOfSpots

  //   return newState
  // }

  // setState(prev => {
  //   // state with new version of appointments
  //   const newState = {...prev, appointments}
  //   //run updateSpots of newState
  //   const updatedSpotsState = updatedSpots(newState)
  //   return updatedSpotsState
  // })

  

//   function updateSpots(change) {
//     //print a days array copy for updating spots
//     const days = [...state.days].map(day => ({ ...day }));
//     //find matching day object 
//     const matchDayObj = days.filter((day) => state.day === day.name)[0]
//     matchDayObj.spots = matchDayObj.spots + change
//     return days
//  }

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   interviewers: {},
  //   appointments: {}
  // });

  const setDay = day => dispatch( {type:SET_DAY, day} )

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
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview }
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    const checkInterviewExists = state.appointments[id].interview
    //if updating existing interview do not change spots, else (if creating new interview) remove one spot
    const days = checkInterviewExists ? updateSpots(0) : updateSpots(-1)

    return axios.put(`api/appointments/${id}`, appointment)
      .then(() => setState({
        ...state,
        appointments,
        days
      }))
  }

  //use appointment id to find the right appointment slot and set it's interview data to null
  function cancelInterview(id) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
  
    const days = updateSpots(1)

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