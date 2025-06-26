# Prova Pratica de Teste de Software

## Objetivo

Avaliar a capacidade do candidato em automatizar casos de uso em sites reais, utilizando ferramentas de testes de interface (UI), aplicando boas práticas de desenvolvimento de testes e documentação, usando Robot framework ou Cypress. 

---

## O que deve ser feito

1. Login e Logout
- Validar login com usuário e senha corretos
- Validar comportamento com usuário e senha incorretos 
- Realizar logout após login bem-sucedido 

2. Produtos 
- Validar a exibição da lista de produtos após login 
- Visualizar detalhes de um produto 
- Ordenar produtos (por nome, preço, etc.) 

3. Carrinho 
- Adicionar produtos ao carrinho 
- Remover produtos do carrinho 
- Validar itens adicionados estão corretos 

4. Checkout 
- Iniciar processo de checkout 
- Preencher dados obrigatórios (nome, sobrenome, CEP) 
- Validar resumo da compra 
- Finalizar compra e validar mensagem de sucesso 


---
# Como Executar

1. Clone este repositório:
```bash
git clone https://github.com/oMegaTraiin/cypress.git
```

2. Instela o cypress:
```bash
npm cypress install
```

3. Execute o programa:
```bash
npx cypress open
```

---