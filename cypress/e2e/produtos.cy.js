describe('Teste de produtos - SauceDemo', () => {

    // Faz isso antes de cada teste
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory.html')
    })

    it('Validar exibição de produtos', () => {
        // Verifica se a lista de produtos está visível
        cy.get('[data-test="inventory-container"]').should('be.visible')
        cy.get('[data-test="inventory-item-name"]').should('be.visible')
        cy.get('[data-test="inventory-item-price"]').should('be.visible')
        cy.screenshot('produtos/validar-exibicao-produtos')
    })

    it('Visualizar detalhes de um produto', () => { 
        cy.get('[data-test="inventory-container"]').contains('Sauce Labs Backpack').click()

        // Verifica se a URL exibe o Item
        cy.url().should('include', '/inventory-item');
        cy.screenshot('produtos/detalhes-produto')
    })

    it('Ordenar produtos de A a Z', () => {
        cy.get('[data-test="product-sort-container"]').select('Name (A to Z)')

        // Verifica se o primeiro produto é o "Sauce Labs Backpack"
        cy.get('[data-test="inventory-item-name"]').first().should('contain', 'Sauce Labs Backpack')
        cy.screenshot('produtos/ordenar-a-z')
    })

    it('Ordenar produtos de Z a A', () => {
        cy.get('[data-test="product-sort-container"]').select('Name (Z to A)')

        // Verifica se o primeiro produto é o "Test.allTheThings() T-Shirt (Red)"
        cy.get('[data-test="inventory-item-name"]').first().should('contain', 'T-Shirt (Red)')
        cy.screenshot('produtos/ordenar-z-a')
    })

    it('Ordenar produtos por menor preço', () => {
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

        // Verifica se o primeiro produto é o de menor preço
        cy.get('[data-test="inventory-item-price"]').first().should('contain', '$7.99')
        cy.screenshot('produtos/ordenar-menor-preco')
    })

    it('Ordenar produtos por maior preço', () => {
        cy.get('[data-test="product-sort-container"]').select('Price (high to low)')

        // Verifica se o primeiro produto é o de maior preço
        cy.get('[data-test="inventory-item-price"]').first().should('contain', '$49.99')
        cy.screenshot('produtos/ordenar-maior-preco')
    })
})