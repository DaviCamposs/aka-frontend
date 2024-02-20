describe("Registration Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("should show a banner and redirect to login page when success", () => {
    cy.intercept("POST", "/users", {
      statusCode: 201,
      body: {
        message: "user registered!",
      },
    }).as("registerRequest");

    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");

    cy.get('button[type="submit"]').click();

    cy.wait("@registerRequest").then(() => {
      cy.get(".mantine-Notification-title").should("contain", "Success");
      cy.get(".mantine-Notification-description").should(
        "contain",
        "User registered with success"
      );

      cy.url().should("include", "/login");
    });
  });

  it("should show a banner with error message when passwords do not match ", () => {
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password12");
    cy.get('input[name="confirmPassword"]').type("password123");

    cy.get('button[type="submit"]').click();

    cy.get(".mantine-Notification-title").should(
      "contain",
      "Passwords do not match"
    );
    cy.get(".mantine-Notification-description").should("contain", "Try again");

    cy.url().should("not.include", "/login");
  });

  it("should show a banner with error message when email is already registered", () => {
    cy.intercept("POST", "/users", {
      statusCode: 400,
      body: "The email is already registered",
    }).as("registerRequest");

    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="confirmPassword"]').type("password123");

    cy.get('button[type="submit"]').click();

    cy.wait("@registerRequest").then(() => {
      cy.get(".mantine-Notification-title").should(
        "contain",
        "The email is already registered"
      );
      cy.get(".mantine-Notification-description").should(
        "contain",
        "Verify your info"
      );

      cy.url().should("not.include", "/login");
    });
  });
});
