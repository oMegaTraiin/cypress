describe('Teste de login - SauceDemo', () => {

    // Faz isso antes de cada teste
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Validar login com usuário e senha corretos', () => {
        cy.screenshot('login/tela-login')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.screenshot('login/usuario-e-senha-correto')
        cy.get('[data-test="login-button"]').click()

        // Verifica se o usuário foi redirecionado para a página de inventário
        cy.url().should('include', '/inventory.html')
        cy.screenshot('login/tela-inicial')
    })

    it('Validar comportamento com usuário e senha incorretos', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('senha_incorreta')
        cy.screensho('login/pre-login-credenciais-invalidas')
        cy.get('[data-test="login-button"]').click()

        // Verifica se a mensagem de erro é exibida
        cy.get('[data-test="error"]').should('be.visible')
        cy.screenshot('login/usuario-e-senha-incorreto')
    })

    it('Realizar logout após login bem-sucedido', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // Verifica se o usuário foi redirecionado para a página de inventário
        cy.url().should('include', '/inventory.html')

        // Realiza o logout
        cy.get('#react-burger-menu-btn').click()
        cy.screenshot('login/logout-realizado')
        cy.get('[data-test="logout-sidebar-link"]').click()
        
        // verifica se o usuário foi redirecionado para a página de login
        cy.url().should('include', '')
    })
})