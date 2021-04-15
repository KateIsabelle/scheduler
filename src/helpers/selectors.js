

export function getAppointmentsForDay(state, day) {

  //find the object in our state.days array who's name matches the provided day 
  const matchingDay = state.days.filter(d => d.name === day);
  //if matching day is not found, return empty array, else map over appointments array 
  //of matchingDay[0] object, returning true where appointment id is found in state.appointments
  return (matchingDay.length === 0) ? [] : matchingDay[0].appointments.map(apptId => state.appointments[apptId]);
}