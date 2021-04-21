// <reference types="cypress" />

describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });

  xit("should book an interview", () => {
   
    cy.get("[alt=Add]")
      .first()
      .click()
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']")
      .click();
    cy.contains("Save")
      .click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

    /* Visits the root of our web server
    Clicks on the "Add" button in the second appointment
    Enters their name
    Chooses an interviewer
    Clicks the save button
    Sees the booked appointment*/
      });
    
      it("should edit an interview", () => {

      cy.get("[alt=Edit]")
        .first()
        .click({ force: true })
      cy.get("[data-testid=student-name-input]")
        .clear()
        .type("Lydia Miller-Jones");
      cy.get("[alt='Tori Malcolm']")
        .click();
      cy.contains("Save")
        .click();
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Tori Malcolm");
    
      });
    
      xit("should cancel an interview", () => {
    /* Visits the root of our web server
    Clicks the delete button for the existing appointment
    Clicks the confirm button
    Sees that the appointment slot is empty*/
      });


});
