describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'tester',
      username: 'tester',
      password: 'testing'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username')
        .type('tester')

      cy.get('#password')
        .type('testing')

      cy.contains('login')
        .click()

      cy.contains('tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username')
        .type('tester')

      cy.get('#password')
        .type('wrong')

      cy.contains('login')
        .click()

      cy.contains('invalid username or password')
      // notification is displayed red
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})