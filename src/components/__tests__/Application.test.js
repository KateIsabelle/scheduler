import React from "react";
import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText, 
  prettyDOM, 
  getAllByTestId, 
  getByAltText, 
  getByPlaceholderText, 
  queryByText, 
  queryByAltText, 
  getByDisplayValue 
} from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));
   fireEvent.click(getByText("Tuesday"));
  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  const { container, debug } = render(<Application />);
  
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];
  
  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
    }) 
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, /saving/i)).toBeInTheDocument();

  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
})




it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  //3. Click the "Delete" button on the first full appointment
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(getByAltText(appointment, /delete/i));

  //4. Check that the (confirm) element with text "Are you sure you would like to delete" is displayed
  expect(getByText(appointment, /are you sure you would like to delete/i)).toBeInTheDocument();

  //5. Click the "Confirm" button on the confirm element
    fireEvent.click(queryByText(appointment, "Confirm"))

  //6. Check that element with text "Deleting" is displayed
  expect(getByText(appointment, /deleting/i)).toBeInTheDocument()

  //7. Wait until the element with "Add" button is displayed
  await waitForElement(() => getByAltText(appointment, "Add"));

  //8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining"
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  //3. Click the edit button on the first full appointment 
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(getByAltText(appointment, /edit/i));
  //4. enter the name "Lydia Miller-Jones" into the input with text "Archie Cohen"
  fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
    target: { value: "Lydia Miller-Jones" }
    }) 

  //5. click the first interviewer on the list
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  //6. click the "save" button on that same appointment
  fireEvent.click(getByText(appointment, "Save"));

  //7. check that the element with the text "saving" is displayed
  expect(getByText(appointment, /saving/i)).toBeInTheDocument();

  //8. wait until the element with the text "Lydia Miller-Jones" is displayed
  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

  //9. check that the dayListItem with the text "Monday" also has the text "1 spot remaining"
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
  });

  xit("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
  });

});

