const name = "Harry Henry Gebel",
      email = "hhgebel@gmail.com",
      goodPassword = "u4Q7q9yja",
      badPassword = "u4Q7q9yj";

function fillEverything(password = goodPassword) {
  cy.visit("");
  cy.get("[data-cy=addButton]").click();
  cy.get("#name-field").type(name);
  cy.get("#email-field").type(email);
  cy.get("#password-field").type(password);
  cy.get("#tos-checkbox").click();
}

describe('Name takes input', function () {
  //Arrange
  it('Visits a new site', function() {
    // Act
    cy.visit("");
    cy.get("[data-cy=addButton]").click();
    cy.get("#name-field").type(name);
    cy.get("#name-field").should("have.value", name);
  });
});

describe('Email takes input', function () {
  //Arrange
  it('Visits a new site', function() {
    // Act
    cy.visit("");
    cy.get("[data-cy=addButton]").click();
    cy.get("#email-field").type(email);
    cy.get("#email-field").should("have.value", email);
  });
});

describe('Password takes input', function () {
  //Arrange
  it('Visits a new site', function() {
    // Act
    cy.visit("");
    cy.get("[data-cy=addButton]").click();
    cy.get("#password-field").type(goodPassword);
    cy.get("#password-field").should("have.value", goodPassword);
  });
});

describe('TOS can be checked', function () {
  //Arrange
  it('Visits a new site', function() {
    // Act
    cy.visit("");
    cy.get("[data-cy=addButton]").click();
    cy.get("#tos-checkbox").click();
    cy.get("#tos-checkbox").should("to.be.checked");
    //    cy.get("#password-field").should("have.value", password);
  });
});

describe("A valid from can be submitted", function() {
  //Arrange
  it('Visits a new site', function() {
    // Act
    fillEverything();
    cy.get("#submit-button").click();
  });
});

describe("A valid from can be submitted", function() {
  //Arrange
  it('Visits a new site', function() {
    // Act
    fillEverything(badPassword);
    cy.get("#submit-button").should('be.disabled');
  });
});

//  LocalWords:  nameField addButton cy
