describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3005/api/testing/reset')

    const user = {
      'username': 'luca',
      'password': '12345'
    }

    cy.request('POST', 'http://localhost:3005/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })
})

describe('Login', function () {
  it('succeeds with correct credentials', function () {
    cy.contains('login').click()
    cy.get('input:first').type('luca')
    cy.get('input:last').type('12345')
    cy.get('#formlogin').click()
    cy.contains('logout').click()
  })

  it('fails with wrong credentials', function () {
    cy.contains('login').click()
    cy.get('input:first').type('augusto')
    cy.get('input:last').type('123456')
    cy.get('#formlogin').click()
    cy.contains('Wrong credentials')
  })
})

describe('Test Blogs', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('input:first').type('luca')
    cy.get('input:last').type('12345')
    cy.get('#formlogin').click()
  })

  it('create blog like it and delete it', function () {

    cy.contains('create new blog').click()
    cy.get('input:first').type('titolo')
    cy.get('#authorinput').type('authore')
    cy.get('input:last').type('url')
    cy.contains('save').click()

    cy.contains('titolo')
    cy.contains('authore')
    cy.contains('View').click()
    cy.get('#likebutton').click()
    cy.contains('1')

    cy.contains('Remove').click()
    cy.on('window:confirm', () => true)
    cy.contains('View').should("not.exist")
  })

  it("Check blogs sorted by likes", function () {

    const blogs = [{
      title: 'first',
      author: 'Cypress',
      url: 'https://www.cypress.io/',
      likes: 2,
      user : 'sss'
    }, {
      title: 'third',
      author: 'Cypress',
      url: 'https://www.cypress.io/',
      likes: 0,
      user : 'sss'
    },
    {
      title: 'second',
      author: 'Cypress',
      url: 'https://www.cypress.io/',
      likes: 1,
      user : 'sss'
    }]

    blogs.forEach(blog => {
      cy.request({
        method: 'POST', url: 'http://localhost:3005/api/blogs', body: {
          title: 'first',
          author: 'Cypress',
          url: 'https://www.cypress.io/',
          likes: 2,
        }, headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem('LoggedUser')).token
            }`
        }
      })
    })

    cy.visit('http://localhost:3000')

    let count = 3
    cy.get('[data-cy="blog"]').then(function (el, i) {
      expect(Number(el.find('[data-cy="likes"]').innerText).to.be(count))
      --count
    })
  })
})