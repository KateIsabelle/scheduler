/// <reference types="cypress" />

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
});
