const defaultUserName = "Harry Henry Gebel",
      defaultEmail = "hhgebel@gmail.com",
      goodPassword = "u4Q7q9yja",
      badPassword = "u4Q7q9yj";

function fillEverything(variances = {}) {
  const userName = "userName" in variances ?
        variances.userName :
        defaultUserName,
        email = "email" in variances ? variances.email : defaultEmail,
        password = "password" in variances ? variances.password : goodPassword,
        checkTOS = "checkTOS" in variances ? variances.checkTOS : true;
  console.log(userName, email, password, checkTOS);
  cy.visit("");
  cy.get("[data-cy=addButton]").click();
  if (userName)
    cy.get("#name-field").type(userName);
  if (email)
    cy.get("#email-field").type(email);
  if (password)
    cy.get("#password-field").type(password);
  if (checkTOS)
    cy.get("#tos-checkbox").click();
}

describe('Name takes input', function () {
  //Arrange
  it('Visits a new site', function() {
    // Act
    cy.visit("");
    cy.get("[data-cy=addButton]").click();
    cy.get("#name-field").type(defaultUserName);
    cy.get("#name-field").should("have.value", defaultUserName);
  });
});

describe('Email takes input', function () {
  //Arrange
  it('Visits a new site', function() {
    // Act
    cy.visit("");
    cy.get("[data-cy=addButton]").click();
    cy.get("#email-field").type(defaultEmail);
    cy.get("#email-field").should("have.value", defaultEmail);
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

describe("A valid form can be submitted", function() {
  //Arrange
  it('Visits a new site', function() {
    // Act
    fillEverything();
    cy.get("#submit-button").click();
  });
});

describe("Insufficient password prevents submission", function() { //
  //Arrange
  it('Visits a new site', function() {
    // Act
    fillEverything({password: badPassword});
    cy.get("#submit-button").should('be.disabled');
  });
});

describe("No name prevents submission", function() { //
  //Arrange
  it('Visits a new site', function() {
    // Act
    fillEverything({userName: ""});
    cy.get("#submit-button").should('be.disabled');
  });
});

describe("No email prevents submission", function() { //
  //Arrange
  it('Visits a new site', function() {
    // Act
    fillEverything({email: ""});
    cy.get("#submit-button").should('be.disabled');
  });
});

describe("No email domain prevents submission", function() { //
  //Arrange
  it('Visits a new site', function() {
    // Act
    fillEverything({email: "hhgebelgmail.com"});
    cy.get("#submit-button").should('be.disabled');
  });
});

describe("Invalid email domain prevents submission", function() { //
  //Arrange
  it('Visits a new site', function() {
    // Act
    fillEverything({email: "hhgebel@gmailcom"});
    cy.get("#submit-button").should('be.disabled');
  });
});

describe("Failure to accept TOS prevents submission", function() { //
  //Arrange
  it('Visits a new site', function() {
    // Act
    fillEverything({checkTOS: false});
    cy.get("#submit-button").should('be.disabled');
  });
});

//  LocalWords: addButton cy
