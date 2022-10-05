describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'ombrice',
      password: 'mimita',
    });
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.get('h2').should('contain', 'Login to application');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ombrice');
      cy.get('#password').type('mimita');
      cy.get('.login-form > button').click();
      cy.get('#app').should('contain.not', 'Login to application');
      cy.get('#app').should('contain', 'Blogs');
      cy.get('#app').should('contain', 'ombrice logged in');
    });
    it('fails with wrong credentials', function () {
      cy.get('#username').type('ombrice');
      cy.get('#password').type('wrong');
      cy.get('.login-form > button').click();
      cy.get('#app').should('contain', 'username or password incorrect');
    });

    describe('when logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'ombrice', password: 'mimita' });
      });
      it('a blog can be created', function () {
        const blog = { title: 'test', url: 'http://test.com', author: 'test' };
        cy.contains('new blog').click();
        cy.get('.blog-form input').each((input) =>
          cy.wrap(input).type(blog[input[0].name])
        );
        cy.get('.blog-form button').click();
        cy.get('#app').should('contain', 'a new blog "test" added');
        cy.get('#app').should('contain', 'test: test');
        cy.get('.blog-form').parent().should('have.css', 'display', 'none');
      });

      describe('and several blogs exists', function () {
        beforeEach(function () {
          cy.addBlog({
            title: 'test1',
            url: 'http://test1.com',
            author: 'test',
          });
          cy.addBlog({
            title: 'test2',
            url: 'http://test2.com',
            author: 'test',
          });
          cy.addBlog({
            title: 'test3',
            url: 'http://test3.com',
            author: 'test',
          });
          cy.get('.blog-item').eq(0).find('button').contains('view').click();
          cy.get('.blog-item').eq(1).find('button').contains('view').click();
          cy.get('.blog-item').eq(2).find('button').contains('view').click();
        });

        it('user can like blog', function () {
          cy.get('.blog-item').eq(0).find('button').contains('like').click();
          cy.get('.blog-item').eq(0).should('contain', 'likes: 1');
        });

        it('user who added the blog can delete it', function () {
          cy.get('.blog-item').eq(0).find('button').contains('remove').click();
          cy.get('.blog-item').eq(0).should('not.exist');
        });

        it('user who did not add the blog can not delete it', function () {
          const user = {
            username: 'user2',
            password: 'mimita',
          };
          cy.request('POST', 'http://localhost:3001/api/users', user);
          cy.login(user);
          cy.visit('http://localhost:3000');
          cy.get('.blog-item').eq(0).find('button').contains('view').click();
          cy.get('.blog-item').eq(0).should('not.contain', 'remove');
        });

        it('top blogs are the most liked', function () {
          cy.get('.blog-item').eq(0).find('button').contains('like').as('btn1');
          cy.get('.blog-item').eq(1).find('button').contains('like').as('btn2');
          cy.get('.blog-item').eq(2).find('button').contains('like').as('btn3');

          cy.get('@btn2').click();
          cy.visit('http://localhost:3000');
          cy.get('.blog-item').eq(0).should('contain', 'test: test2');
        });
      });
    });
  });
});
