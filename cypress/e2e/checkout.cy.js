describe('Teste de checkout - SauceDemo', () => {

    const Checkout = () => {
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.url().should('include', '/cart.html')
        cy.get('[data-test="checkout"]').click()
        cy.url().should('include', '/checkout-step-one.html')
    }

    const PreencherDadosCheckout = () => {
        cy.get('[data-test="firstName"]').type('Bruno')
        cy.get('[data-test="lastName"]').type('Bezerra')
        cy.get('[data-test="postalCode"]').type('33333-333')
    }

    const AdicionarProdutosAoCarrinho = () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    }

    // Faz isso antes de cada teste
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory.html')
        AdicionarProdutosAoCarrinho()
    })

    it('Inicia processo de checkout', () => {
        Checkout()
        cy.screenshot('checkout/iniciar-processo-checkout')
    })

    it('Preenche dados obrigatórios (nome, sobrenome, CEP)', () => {
        Checkout()
        PreencherDadosCheckout()
        cy.screenshot('checkout/preencher-dados-obrigatorios')
    })

    it('Validar resumo da compra', () => {
        Checkout()
        PreencherDadosCheckout()
        cy.get('[data-test="continue"]').click()
        cy.url().should('include', '/checkout-step-two.html')
        cy.get('[data-test="checkout-summary-container"]').should('be.visible')
        cy.screenshot('checkout/validar-resumo-compra')
    })

    it('Finaliza compra e valida mensagem de sucesso', () => {
        Checkout()
        PreencherDadosCheckout()
        cy.get('[data-test="continue"]').click()
        cy.url().should('include', '/checkout-step-two.html')
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order!')
        cy.screenshot('checkout/validar-mensagem-sucesso')
    })
})