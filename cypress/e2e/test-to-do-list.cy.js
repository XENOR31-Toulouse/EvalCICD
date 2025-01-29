

describe('To Do List', () => {
  it('should add a new task to the list', () => {
    // j'ai creer un virtual host via wamp
    cy.visit('http://to-do-list/');

    cy.get('[data-cy=task-title-input]')
      .type('Task 1')
      .should('have.value', 'Task 1');

    cy.get('[data-cy=add-task-button]')
      .click();

    cy.get('[data-cy=task-list]')
      .contains('Task 1');
  });
});
