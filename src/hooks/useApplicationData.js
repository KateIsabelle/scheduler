import React, { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../../src/reducers/application";

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


 
