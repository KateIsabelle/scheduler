export function getAppointmentsForDay(state, day) {

  //find the object in our state.days array who's name matches the provided day 
  const matchingDay = state.days.filter(d => d.name === day);
  //if matching day is not found, return empty array, else map over appointments array (containing appointment ids)
  //found in matchingDay[0] object, returning an array of objects representating the appointments that match each id
  return (matchingDay.length === 0) ? [] : matchingDay[0].appointments.map(apptId => state.appointments[apptId]);
}

//update the value of interview object's 'interviewer' key to be an object of interviewer data rather than just their id
export function getInterview(state, interview) {
  //if there is an interview object passed, return object with student: name
  //and interview: { interviewer object } containing a shallow copy of this interviewer object (with matching interviewer key) from state
  return interview ? {
    student: interview.student,
    interviewer: { ...state.interviewers[interview.interviewer] }
  }
    //if no interview, return null
    : null;
}

export function getInterviewersForDay(state, day) {
  //follows same pattern as getAppointmentsForDay
  const matchingDay = state.days.filter(d => d.name === day);
  return (matchingDay.length === 0) ? [] : matchingDay[0].interviewers.map(interviewerId => state.interviewers[interviewerId]);

}