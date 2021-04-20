import React from "react";
import { render } from "@testing-library/react";
import Appointment from "components/Appointment/index";

describe("Appointment", () => {
  xit("renders without crashing", () => {
    const props = {}
    render(<Appointment {...props}/>);
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

  });

  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    
  });

  xit("shows the save error when failing to save an appointment", async () => {
    
  });

  xit("shows the delete error when failing to delete an existing appointment", async () => {
    
  });

});