describe('Home Indicator Sidebar', () => {
  beforeEach(function() {
    cy.fixture('home/counts/birthdaysCount.json').as('birthdaysCount');
    cy.fixture('home/counts/checkoutCount.json').as('checkoutCount');
    cy.fixture('home/counts/checkinCount.json').as('checkinCount');
    cy.fixture('home/counts/overdueCount.json').as('overdueCount');
    cy.fixture('home/birthdays.json').as('birthdays');
    cy.fixture('home/scans.json').as('scans');
    cy.fixture('home/overdue.json').as('overdue');

    cy.server();
    cy.route('GET', 'booksout/overduecount', '@overdueCount');
    cy.route('GET', 'booksout/checkinscount', '@checkinCount');
    cy.route('GET', 'booksout/checkoutscount', '@checkoutCount');
    cy.route('GET', 'student/birthdayscount', '@birthdaysCount');

    cy.route('GET', 'student/birthdays', '@birthdays');
    cy.route('GET', 'booksout/scans', '@scans');
    cy.route('GET', 'booksout/overdue', '@overdue');

    cy.visit('http://localhost:3000/home');
  });
  it('should display indicator data on the top page', () => {
    cy.get('[data-cy=checkout-tile]').should('have.text', '');
  });
});
