describe('Teste de carrinho - SauceDemo', () => {

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
    })

    it('Adicionar produtos ao carrinho', () => {
        AdicionarProdutosAoCarrinho()

        // Verifica se o ícone do carrinho exibe o número correto de itens
        cy.get('[data-test="shopping-cart-link"]').scrollIntoView().should('contain', '3')

        cy.screenshot('carrinho/produtos-adicionados')
    })

    it('Remover produtos do carrinho', () => {
        AdicionarProdutosAoCarrinho()
        
        // Verifica se o ícone do carrinho exibe o número correto de itens
        cy.get('[data-test="shopping-cart-link"]').scrollIntoView().should('contain', '3')

        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click()

        cy.screenshot('carrinho/produtos-removidos')
    })

    it('Validar itens adicionados estão corretos', () => {
        // Adiciona itens ao carrinho
        AdicionarProdutosAoCarrinho()

        // Vai para o carrinho de compras
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.url().should('include', '/cart.html')

        // Verifica se o número total de itens no carrinho é 3
        cy.get('[data-test="inventory-item"]').should('have.length', 3)

        // Verifica se os itens adicionados estão corretos
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Backpack')
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Bike Light')
        cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Bolt T-Shirt')

        cy.screenshot('carrinho/validar-itens-adicionados')
    })
})