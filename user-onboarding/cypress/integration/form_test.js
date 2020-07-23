const name = "Harry Henry Gebel",
      email = "hhgebel@gmail.com",
      password = "u4Q7q9yja4*";


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
    cy.get("#password-field").type(password);
    cy.get("#password-field").should("have.value", password);
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

//  LocalWords:  nameField addButton cy
