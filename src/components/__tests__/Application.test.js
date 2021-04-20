import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";
import Application from "components/Application";

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
  });
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
  const { container } = render(<Appointment />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  //3. Click the "Delete" button on the first full appointment
  // const appointments = getAllByTestId(container, "appointment");
  // const appointment = appointments[0];

  // fireEvent.click(getByAltText(appointment, "Delete"));

  //4. Check that the (confirm) element with text "Are you sure you would like to delete" is displayed


  //5. Click the "Confirm" button on the confirm element
  //6. Check that element with text "Deleting" is displayed
  //7. Wait until the element with id "empty" is displayed
  //8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining"

  
  });

  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    
  });

  xit("shows the save error when failing to save an appointment", async () => {
    
  });

  xit("shows the delete error when failing to delete an existing appointment", async () => {
    
  });

});

