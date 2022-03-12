/// <reference types="Cypress" />
// início da estrutura, Criando todo o fluxo dentro da aplicação.

import loc from '../../support/locators'
import '../../support/commandsContas'

// Should test at functional level.
describe('Deve testar o nível Funcional', () => {
    after(() => {
        cy.clearLocalStorage()
    })
    before(() => {
        cy.login('acessoaocurso.cy@', '#course_cy')
         //   cy.visit('https://barrigareact.wcaquino.me/')
        // cy.get(loc.LOGIN.USER).type('acessoaocurso.cy@')
        // cy.get(loc.LOGIN.PASSWORD).type('#course_cy')

        // cy.get(loc.LOGIN.BTN_LOGIN).click()
        // cy.get(loc.MENSSAGE).should('contain', 'Bem vindo')

    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })


    //Cenário 1- Inserir conta.
    // Should create an accout. 
    it('Deve inserir/criar uma conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        // cy.get(loc.MENU.SETTINGS).click()
        //  cy.get(loc.MENU.CONTAS).click()

        // cy.get(loc.CONTAS.NOME).type('Conta de teste')
        //  cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MENSSAGE).should('contain', 'Conta inserida com sucesso')


    })

    //Cenário 2- Alterando a conta.
    //Should update an account.
    it('Deve alterar uma conta', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MENSSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    //Cenário 3- Inserir Conta repetida
    // should not create an account with same name.
    it('Não deve criar uma conta com o mesmo nome', () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MENSSAGE).should('contain', 'code 400')


    })
    //Cenário 4- Inserir movimentação
    //Should create a transaction
    it('Deve criar uma transação', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MENSSAGE).should('contain', 'sucesso!')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })
    //Cenário 5- Consulta do saldo. 
    // Should get balance.
    it('Deve identificar o saldo', () => {
       // console.log(loc.SALDO.FN_XP_SALDO_CONTA('Conta alterada'))
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MENSSAGE).should('contain', 'sucesso')
        
       // cy.get(loc.MENU.HOME).click()
       // cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contains', '534,00')


    })
     //Cenário 6- Remover Movimentão
    //Should remova a transaction 

    it('Deve remover uma movimentação', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MENSSAGE).should('contain', 'sucesso!')

    })
})