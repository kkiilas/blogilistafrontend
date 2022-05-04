describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.createUser({
      username: 'käyttäjä',
      name: 'Vänrikki Stool',
      password: 'salainen',
    })
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.get('button').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('käyttäjä')
      cy.get('#password').type('salainen')
      cy.get('button').contains('login').click()
      cy.contains('Vänrikki Stool logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('käyttäjä')
      cy.get('#password').type('wrong')
      cy.get('button').contains('login').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Vänrikki Stool logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'käyttäjä', password: 'salainen' })
    })

    it('a blog can be created', function () {
      cy.contains('Create a new blog').click()
      cy.get('#title').type(
        'Prince Andrew Settles Sexual Abuse Lawsuit With Virginia Giuffre'
      )
      cy.get('#author').type('Benjamin Weiser')
      cy.get('#url').type(
        'https://www.nytimes.com/2022/02/15/nyregion/prince-andrew-virginia-giuffre-settlement.html'
      )
      cy.contains('create').click()
      cy.contains(
        'Prince Andrew Settles Sexual Abuse Lawsuit With Virginia Giuffre'
      )
    })

    describe('A blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title:
            'Accounting Firm Cuts Ties With Trump and Retracts Financial Statements',
          author: 'Ben Protess and William K. Rashbaum',
          url: 'https://www.nytimes.com/2022/02/14/nyregion/mazars-trump-organization-financial-statements.html',
        })
      })

      it('it can be liked', function () {
        cy.contains(
          'Accounting Firm Cuts Ties With Trump and Retracts Financial Statements'
        ).as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').contains('likes 0')
        cy.get('@theBlog').contains('like').click()
        cy.get('@theBlog').contains('likes 1')
      })

      it('it can be deleted by the user who created it', function () {
        cy.contains(
          'Accounting Firm Cuts Ties With Trump and Retracts Financial Statements'
        ).as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').contains('remove').click()
        cy.get('@theBlog').should('not.exist')
      })

      describe('A blog created by another user exists', function () {
        beforeEach(function () {
          cy.createUser({
            username: 'användare',
            name: 'Fänrik Stool',
            password: 'hemlig',
          })

          cy.login({ username: 'användare', password: 'hemlig' })

          cy.createBlog({
            title: 'U.S. Battles Putin by Disclosing His Next Possible Moves',
            author: 'Julian E. Barnes and Helene Cooper',
            url: 'https://www.nytimes.com/2022/02/12/us/politics/russia-information-putin-biden.html',
          })

          cy.contains('logout').click()
          cy.login({ username: 'käyttäjä', password: 'salainen' })
        })

        it('it cannot be deleted by the user who did not create it', function () {
          cy.contains(
            'U.S. Battles Putin by Disclosing His Next Possible Moves'
          ).as('theBlog')
          cy.get('@theBlog').contains('view').click()
          cy.get('@theBlog').should('not.contain', 'remove')
        })
      })

      describe('Two more blogs exist and each blog has a different number of likes', function () {
        beforeEach(function () {
          cy.createBlog({
            title:
              'Sandy Hook Families Settle With Gunmaker for $73 Million Over Massacre',
            author: 'Rick Rojas, Karen Zraick and Troy Closson',
            url: 'https://www.nytimes.com/2022/02/15/nyregion/sandy-hook-families-settlement.html',
          })

          cy.createBlog({
            title:
              'How a Secret Assault Allegation Against an Anchor Upended CNN',
            author:
              'Emily Steel, Jodi Kantor, Michael M. Grynbaum, James B. Stewart and John Koblin',
            url: 'https://www.nytimes.com/2022/02/15/business/jeff-zucker-cnn.html',
          })

          cy.get('.blog').then(($blogs) => {
            $blogs.map((i, blog) => {
              cy.wrap(blog).as('blog')
              cy.get('@blog').contains('view').click()
              let j = 0
              while (j <= i) {
                cy.get('@blog').contains('like').click()
                j++
              }
            })
          })

          cy.contains('likes 3')
        })

        it('the blogs are shown in the descending order of likes received', function () {
          cy.get('.blog').then(($blogs) => {
            $blogs.map((i, blog) => {
              cy.wrap(blog)
                .contains(`likes ${3 - i}`)
                .click()
            })
          })
        })
      })
    })

    afterEach(function () {
      cy.contains('logout').click()
    })
  })

  after(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
  })
})
