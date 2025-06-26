describe('Teste de filtro no inventário - SauceDemo', () => {
  it('Acessa site do saucedemo.', () => {
    // Acessa o site do SauceDemo
    cy.visit('https://www.saucedemo.com/')
    cy.screenshot('saucedemo-homepage')

    // Autentica o usuário
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.screenshot('saucedemo-login')
    cy.get('[data-test="login-button"]').click()

    // Verifica se o usuário foi redirecionado para a página de inventário
    cy.url().should('include', '/inventory.html')
    cy.screenshot('saucedemo-inventory')

    // Visualizar detalhes do item "Sauce Labs Backpack"
    cy.get('.inventory_item_name').contains('Sauce Labs Backpack').click()

    // verificar se a URL contém o ID do item
    cy.url().should('include', '/inventory-item.html?id=4')

    // Voltar para a pagina de inventário
    cy.get('.inventory_details_back_button').click()

    // ordenar os itens por preço (menor para maior)
    cy.get('.product_sort_container').select('Price (low to high)')

    // verificar se o item é o com menor preço
    cy.get('.inventory_item_price').first().should('contain', '$7.99')

    // ordenar os itens de Z a A
    cy.get('.product_sort_container').select('Name (Z to A)')

    // verificar se o primeiro item é o último em ordem alfabética
    cy.get('.inventory_item_name').first().should('contain', 'Test.allTheThings() T-Shirt (Red)') 

    // ordenar os itens de A a Z
    cy.get('.product_sort_container').select('Name (A to Z)')

    // Adicionar itens ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()

    // Vai para o carrinho de compras
    cy.get('.shopping_cart_link').click()

    // Verifica se a URL do carrinho de compras está correta
    cy.url().should('include', '/cart.html')

    // Verificar se os itens estão no carrinho
    cy.get('.cart_item').should('have.length', 3) 

    // Remove um item do carrinho
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()

    // Verifica se o item foi removido
    cy.get('.cart_item').should('have.length', 2)

    // Inicia processo de checkout
    cy.get('[data-test="checkout"]').click()
    // Preenche os dados do checkout
    cy.get('[data-test="firstName"]').type('Bruno')
    cy.get('[data-test="lastName"]').type('Bezerra')
    cy.get('[data-test="postalCode"]').type('322112')

    // Clica no botão de continuar
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')

    // Verifica se os itens estão na página de checkout
    cy.get('[data-test="finish"]').click()
    cy.url().should('include', '/checkout-complete.html')
  })
})