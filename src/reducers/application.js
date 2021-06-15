
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

//helper function for updating spots when interviews are canceled, edited, or booked
function daysWithUpdatedSpots(state, change) {
  const days = [...state.days].map(day => ({ ...day }));
  const matchDayObj = days.filter((day) => state.day === day.name)[0]
  matchDayObj.spots += change
  return days
}
//reducer used in src/hooks/useApplicationData
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
    //interview slot was previously filled or null in state
    const oldInterview = state.appointments[id].interview
    //interview slot is filled or null in action
    const newInterview = interview
    //if they were both filled, it is an update and spots can stay the same, 
    //if previous interview spot was filled and it's now null in action, add 1 spot 
    //else (interview was previously null, but new interview exists in action), minus 1 spot 
    const days = (oldInterview && newInterview) ? daysWithUpdatedSpots(state, 0) 
      : (oldInterview ? daysWithUpdatedSpots(state, 1) 
      : daysWithUpdatedSpots(state, -1))

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