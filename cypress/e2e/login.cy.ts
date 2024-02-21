describe("Login Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
    });
  
    it("should redirect to home page when success", () => {
      cy.intercept("POST", "/users/login", {
        statusCode: 200,
        body: {

        }
      }).as("registerRequest");
  
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");
  
      cy.get('button[type="submit"]').click();
  
      cy.url().should("include", "/home");
    });
  

  
    it("should show a banner with error message when password or emails is invalid", () => {
      cy.intercept("POST", "/users/login", {
        statusCode: 401,
        body: "Invalid credentials",
      }).as("registerRequest");
  
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");
  
      cy.get('button[type="submit"]').click();
  
      cy.wait("@registerRequest").then(() => {
        cy.get(".mantine-Notification-title").should(
          "contain",
          "Invalid credentials"
        );
        cy.get(".mantine-Notification-description").should(
          "contain",
          "Verify email email or/and password typed"
        );
  
        cy.url().should("not.include", "/home");
      });
    });
  });
  