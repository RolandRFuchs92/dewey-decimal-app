window.require = something => console.log(something + ' - willy bum');

describe('My First Test', () => {
  it('should do nothing important', () => {
    cy.visit('http://localhost:3000/');
  });
});
