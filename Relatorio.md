# Relatorio - Caso de Teste

---

## 1. Login


### Cenário: Login com usuário e senha corretos


```gherkin
Funcionalidade: Autenticação de usuários

  Cenário: Login com usuário e senha corretos
    Dado que acesso a página de login do SauceDemo
    Quando informo o usuário "standard_user"
      E informo a senha "secret_sauce"
      E clico em "Login"
    Então sou redirecionado para "/inventory.html"
```


```javascript
it('Validar login com usuário e senha corretos', () => {
    cy.screenshot('login/tela-login')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.screenshot('login/usuario-e-senha-correto')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
    cy.screenshot('login/tela-inicial')
})
```

---


### Cenário: Login com usuário e/ou senha incorretos


```gherkin
Funcionalidade: Autenticação de usuários

  Cenário: Login com usuário e/ou senha incorretos
    Dado que acesso a página de login do SauceDemo
    Quando informo o usuário "standard_user"
      E informo a senha "senha_incorreta"
      E clico em "Login"
    Então uma mensagem de erro é exibida
```


```javascript
it('Validar comportamento com usuário e senha incorretos', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('senha_incorreta')
    cy.screensho('login/pre-login-credenciais-invalidas')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('be.visible')
    cy.screenshot('login/usuario-e-senha-incorreto')
})
```

---


### Cenário: Logout após login bem-sucedido


```gherkin
Funcionalidade: Autenticação de usuários

  Cenário: Logout após login bem-sucedido
    Dado que estou logado com sucesso no SauceDemo
    Quando clico no menu hamburguer
      E seleciono "Logout"
    Então sou redirecionado para a página de login
```


```javascript
it('Realizar logout após login bem-sucedido', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')

    cy.get('#react-burger-menu-btn').click()
    cy.screenshot('login/logout-realizado')
    cy.get('[data-test="logout-sidebar-link"]').click()

    cy.url().should('include', '')
})
```


---


## 2. Produtos


### Cenário: Exibição da lista de produtos


```gherkin
Funcionalidade: Navegação e ordenação de produtos

  Cenário: Exibição da lista de produtos
    Dado que estou logado no SauceDemo
    Quando acesso a página de inventário
    Então a lista de produtos é exibida
```


```javascript
it('Validar exibição de produtos', () => {
    cy.get('[data-test="inventory-container"]').should('be.visible')
    cy.get('[data-test="inventory-item-name"]').should('be.visible')
    cy.get('[data-test="inventory-item-price"]').should('be.visible')
    cy.screenshot('produtos/validar-exibicao-produtos')
})
```

---


### Cenário: Visualizar detalhes de um produto


```gherkin
Funcionalidade: Navegação e ordenação de produtos

  Cenário: Visualizar detalhes de um produto
    Dado que estou na lista de produtos
    Quando clico em "Sauce Labs Backpack"
    Então sou redirecionado para a página de detalhes do produto
```


```javascript
it('Visualizar detalhes de um produto', () => { 
    cy.get('[data-test="inventory-container"]').contains('Sauce Labs Backpack').click()

    cy.url().should('include', '/inventory-item');
    cy.screenshot('produtos/detalhes-produto')
})
```

---


### Cenário: Ordenar produtos por nome (A → Z)


```gherkin
Funcionalidade: Navegação e ordenação de produtos

  Cenário: Ordenar produtos por nome (A → Z)
    Dado que estou na lista de produtos
    Quando seleciono "Name (A to Z)" no seletor de ordenação
    Então o primeiro item listado deve ser "Sauce Labs Backpack"
```


```javascript
it('Ordenar produtos de A a Z', () => {
    cy.get('[data-test="product-sort-container"]').select('Name (A to Z)')

    cy.get('[data-test="inventory-item-name"]').first().should('contain', 'Sauce Labs Backpack')
    cy.screenshot('produtos/ordenar-a-z')
})
```

---


### Cenário: Ordenar produtos por nome (Z → A)


```gherkin
Funcionalidade: Navegação e ordenação de produtos

  Cenário: Ordenar produtos por nome (Z → A)
    Dado que estou na lista de produtos
    Quando seleciono "Name (Z to A)" no seletor de ordenação
    Então o primeiro item listado deve ser "Test.allTheThings() T-Shirt (Red)"
```


```javascript
it('Ordenar produtos de Z a A', () => {
    cy.get('[data-test="product-sort-container"]').select('Name (Z to A)')

    cy.get('[data-test="inventory-item-name"]').first().should('contain', 'T-Shirt (Red)')
    cy.screenshot('produtos/ordenar-z-a')
})
```

---


### Cenário: Ordenar produtos por menor preço


```gherkin
Funcionalidade: Navegação e ordenação de produtos

  Cenário: Ordenar produtos por menor preço
    Dado que estou na lista de produtos
    Quando seleciono "Price (low to high)" no seletor de ordenação
    Então o primeiro item listado deve ter preço "$7.99"
```


```javascript
it('Ordenar produtos por menor preço', () => {
    cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

    cy.get('[data-test="inventory-item-price"]').first().should('contain', '$7.99')
    cy.screenshot('produtos/ordenar-menor-preco')
})
```

---


### Cenário: Ordenar produtos por maior preço


```gherkin
Funcionalidade: Navegação e ordenação de produtos

  Cenário: Ordenar produtos por maior preço
    Dado que estou na lista de produtos
    Quando seleciono "Price (high to low)" no seletor de ordenação
    Então o primeiro item listado deve ter preço "$49.99"
```


```javascript
it('Ordenar produtos por maior preço', () => {
    cy.get('[data-test="product-sort-container"]').select('Price (high to low)')

    cy.get('[data-test="inventory-item-price"]').first().should('contain', '$49.99')
    cy.screenshot('produtos/ordenar-maior-preco')
})
```


---


## 3. Carrinho


### Cenário: Adicionar produtos ao carrinho


```gherkin
Funcionalidade: Gerenciamento de itens no carrinho

  Cenário: Adicionar produtos ao carrinho
    Dado que estou na página de inventário
    Quando adiciono três produtos ao carrinho
    Então o ícone do carrinho deve exibir "3"
```


```javascript
it('Adicionar produtos ao carrinho', () => {
    AdicionarProdutosAoCarrinho()

    cy.get('[data-test="shopping-cart-link"]').scrollIntoView().should('contain', '3')

    cy.screenshot('carrinho/produtos-adicionados')
})
```

---


### Cenário: Remover produtos do carrinho


```gherkin
Funcionalidade: Gerenciamento de itens no carrinho

  Cenário: Remover produtos do carrinho
    Dado que tenho 3 itens no carrinho
    Quando removo todos os itens
    Então o carrinho fica vazio
```


```javascript
it('Remover produtos do carrinho', () => {
    AdicionarProdutosAoCarrinho()

    cy.get('[data-test="shopping-cart-link"]').scrollIntoView().should('contain', '3')

    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click()

    cy.screenshot('carrinho/produtos-removidos')
})
```

---


### Cenário: Validar itens adicionados estão corretos


```gherkin
Funcionalidade: Gerenciamento de itens no carrinho

  Cenário: Validar itens adicionados estão corretos
    Dado que adicionei 3 produtos ao carrinho
    Quando acesso o carrinho
    Então devo ver os mesmos 3 produtos listados
```


```javascript
it('Validar itens adicionados estão corretos', () => {
    AdicionarProdutosAoCarrinho()

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')

    cy.get('[data-test="inventory-item"]').should('have.length', 3)

    cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Backpack')
    cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Bike Light')
    cy.get('[data-test="inventory-item-name"]').should('contain', 'Sauce Labs Bolt T-Shirt')

    cy.screenshot('carrinho/validar-itens-adicionados')
})
```


---


## 4. Checkout


### Cenário: Iniciar processo de checkout


```gherkin
Funcionalidade: Processo de checkout

  Cenário: Iniciar processo de checkout
    Dado que possuo itens no carrinho
    Quando clico em "Checkout"
    Então sou redirecionado para "/checkout-step-one.html"
```


```javascript
it('Inicia processo de checkout', () => {
    Checkout()
    cy.screenshot('checkout/iniciar-processo-checkout')
})
```

---


### Cenário: Preencher dados obrigatórios


```gherkin
Funcionalidade: Processo de checkout

  Cenário: Preencher dados obrigatórios
    Dado que estou na etapa 1 do checkout
    Quando preencho "First Name" com "Bruno"
      E preencho "Last Name" com "Bezerra"
      E preencho "Postal Code" com "33333-333"
    Então os campos obrigatórios são aceitos
```


```javascript
it('Preenche dados obrigatórios (nome, sobrenome, CEP)', () => {
    Checkout()
    PreencherDadosCheckout()
    cy.screenshot('checkout/preencher-dados-obrigatorios')
})
```

---


### Cenário: Validar resumo da compra


```gherkin
Funcionalidade: Processo de checkout

  Cenário: Validar resumo da compra
    Dado que preenchi os dados obrigatórios do checkout
    Когда clico em "Continue"
    Então sou redirecionado para "/checkout-step-two.html"
      E o resumo da compra é exibido
```


```javascript
it('Validar resumo da compra', () => {
    Checkout()
    PreencherDadosCheckout()
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('[data-test="checkout-summary-container"]').should('be.visible')
    cy.screenshot('checkout/validar-resumo-compra')
})
```

---


### Cenário: Finalizar compra com sucesso


```gherkin
Funcionalidade: Processo de checkout

  Cenário: Finalizar compra com sucesso
    Dado que estou na etapa 2 do checkout
    Quando clico em "Finish"
    Então a mensagem "Thank you for your order!" é exibida
```


```javascript
it('Finaliza compra e valida mensagem de sucesso', () => {
    Checkout()
    PreencherDadosCheckout()
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('[data-test="finish"]').click()
    cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order!')
    cy.screenshot('checkout/validar-mensagem-sucesso')
})
```
