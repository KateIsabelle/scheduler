
export function getAppointmentsForDay(state, day) {

  //find the object in our state.days array who's name matches the provided day 
  const matchingDay = state.days.filter(d => d.name === day);
  //if matching day is not found, return empty array, else map over appointments array (containing appointment ids)
  //found in matchingDay[0] object, returning an array of objects representating the appointments that match each id
  return (matchingDay.length === 0) ? [] : matchingDay[0].appointments.map(apptId => state.appointments[apptId]);
}