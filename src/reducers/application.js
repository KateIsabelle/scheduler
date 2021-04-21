
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

//helper function for updating spots when interviews are canceled or booked
function updateSpots(state, change) {
  const days = [...state.days].map(day => ({ ...day }));
  const matchDayObj = days.filter((day) => state.day === day.name)[0]
  matchDayObj.spots += change
  return days
}

export default function reducer(state, action) {
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