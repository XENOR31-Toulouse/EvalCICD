describe('To Do List', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('should add a new task to the list', () => {
    cy.get('[data-cy=task-title-input]')
      .type('Task 1')
      .should('have.value', 'Task 1');

    cy.get('[data-cy=add-task-button]').click();

    cy.wait(500); // Ensure the UI updates

    cy.get('[data-cy=task-list]')
      .contains('Task 1')
      .should('exist');
  });

  it('should mark a task as completed', () => {
    cy.get('[data-cy=task-title-input]').type('Task 2');
    cy.get('[data-cy=add-task-button]').click();
    cy.wait(500);

    // Find the task and mark it as completed
    cy.get('[data-cy=task-list]')
      .contains('Task 2')
      .parent()
      .find('input[type="checkbox"]')
      .check();

    cy.get('[data-cy=task-list]')
      .contains('Task 2')
      .should('have.class', 'completed');
  });

  it('should edit a task title', () => {
    cy.get('[data-cy=task-title-input]').type('Task 3');
    cy.get('[data-cy=add-task-button]').click();
    cy.wait(500);

    cy.get('[data-cy=task-list]')
      .contains('Task 3')
      .dblclick(); // Simulate double-click to edit (if implemented)

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Updated Task 3');
      cy.get('[data-cy=task-list]')
        .contains('Task 3')
        .click(); // Trigger edit function
    });

    cy.get('[data-cy=task-list]')
      .contains('Updated Task 3')
      .should('exist');
  });

  it('should delete a task from the list', () => {
    cy.get('[data-cy=task-title-input]').type('Task 4');
    cy.get('[data-cy=add-task-button]').click();
    cy.wait(500);

    cy.get('[data-cy=task-list]')
      .contains('Task 4')
      .parent()
      .find('button')
      .click();

    cy.wait(500);

    cy.get('[data-cy=task-list]')
      .contains('Task 4')
      .should('not.exist');
  });
});
