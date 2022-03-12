/// <reference types="Cypress" />
// Utilizado a mesma estrutura do "Funcional".

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

//(Should test at functional level).
describe('Deve testar o nível Funcional', () => {
    after(() => {
        cy.clearLocalStorage()
    })
 //   })
 //   before(() => {
       
 //   [Criado um buildEnv para sobrescever algumas ROTAS PADRÃO, abaixo um exemplo da sintaxe utilizada 
 //antes da criação do command ]

  //  cy.server()
  //  cy.route({
    //    method: 'POST',
   //     url: '/signin',
    //    response: {
     //       id:1000,
     //       nome:'Usuario falso',
    //        token: 'Uma string muito grande que nao deveria ser aceito mas na verdade, vai',
   //     }
  //  }).as('signin') 
   //        cy.login('acessoaocurso.cy@', 'Senha errada')

     beforeEach(() => {
        buildEnv()
        cy.login(loc.LOGIN.USER, (loc.LOGIN.PASSWORD));
        cy.get(loc.MENU.HOME).click()
       // cy.resetApp()
    })
    // Should test the responsiveness
    it('Deve testar a responsividade', () => {
        cy.get('[data-test=menu-home]').should('exist')
        .and('be.visible')
       cy.viewport(500,700)
       cy.get('[data-test=menu-home]').should('exist')
        .and('be.not.visible')
        cy.viewport('iphone-5')
       cy.get('[data-test=menu-home]').should('exist')
        .and('be.not.visible')


    })

//Cenário 1- Inserir conta.(Should create an accout). 
    it('Deve inserir/criar uma conta', () => {
        //   [Criado um buildEnv para sobrescever algumas ROTAS PADRÃO, abaixo um exemplo da sintaxe utilizada 
 //antes da criação do command ]
      //  cy.route({
      //      method: 'GET',
      //      url: '/contas',
     //       response: [
      //          {id:1,nome: 'Carteira', visivel:true,usuario_id:1},
      //          {id:2,nome: 'Banco', visivel:true,usuario_id:1},
      //      ]
     //        }).as('contas')

           cy.route({
               method: 'POST',
               url: '/contas',
               response: {id:3, nome:"Conta de teste",visivel:true,usuario_id:1},
           }).as('saveConta')


        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id:1,nome: 'Carteira', visivel:true,usuario_id:1},
                {id:2,nome: 'Banco', visivel:true,usuario_id:1},
                {id:3,nome: 'Conta de teste', visivel:true,usuario_id:1},
            ]

           }).as('contasSave')

        cy.inserirConta('Conta de teste')
       
        cy.get(loc.MENSSAGE).should('contain', 'Conta inserida com sucesso')


    })

    //Cenário 2- Alterando a conta. (Should update an account).
    it('Deve alterar uma conta', () => {
         cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: {id:1,nome: 'Conta alterada', visivel:true,usuario_id:1},
        })
       
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Banco')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MENSSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    //Cenário 3- Inserir Conta repetida.(Should not create an account with same name).
    it('Não deve criar uma conta com o mesmo nome', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {"error": "Já existe uma conta com esse nome!"},
            status: 400
        }).as('saveContaMesmoNome')

        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MENSSAGE).should('contain', 'code 400')


    })
    //Cenário 4- Inserir movimentação
    //Should create a transaction
    it('Deve criar uma transação', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {"id":1022084,"descricao":"sdaad","envolvido":"vbvcb","observacao":null,"tipo":"REC","data_transacao":"2022-02-22T03:00:00.000Z","data_pagamento":"2022-02-22T03:00:00.000Z","valor":"232.00","status":false,"conta_id":1096022,"usuario_id":28019,"transferencia_id":null,"parcelamento_id":null}
        })

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva',
        })

        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MENSSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })
    //Cenário 5- Consulta do saldo. 
    // Should get balance.
    it('Deve identificar o saldo', () => {
        // refatorar essas requisições get+ put
      //  buildEnv()
        cy.route({
            method: 'GET',
            url: '/transacoes/**',
            response: 'fixture:saldoSalvo',

        
        }).as('transacoesSave')
    
        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response: 'fixture:saldoSalvo',

        }).as('transacoesSave')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')

        cy.route({
            method:'GET',
            url: '/saldo',
            response: [{
                conta_id:999,
                conta:"Carteira",
                saldo: "4034.00"
            },
            {
                conta_id:9909,
                conta:"Banco",
                saldo: "10000000.00"
            },
            ]
                
        }).as('saldoFinal')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MENSSAGE).should('contain', 'sucesso')


        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
        
    })
     //Cenário 6- Remover Movimentão
    //Should remova a transaction 

    it('Deve remover uma movimentação', () => {
        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204


        }).as('del')
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MENSSAGE).should('contain', 'sucesso!')

    })
    // Validação das requisições a nível de rota.

        //Should validate data send to creat an account.
    it('Deve validar os dados enviados para criar uma conta', () => {
          const reqStub = cy.stub()
           cy.route({
               method: 'POST',
               url: '/contas',
               response: {id:3, nome:"Conta de teste",visivel:true,usuario_id:1},
        // 1°metodo:  onRequest: req => {
        //           console.log(req)
        //          expect(req.request.body.nome).to.be.empty
        //          expect(req.request.headers).to.have.property('Authorization')
        onRequest: reqStub
               
           }).as('saveConta')


        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {id:1,nome: 'Carteira', visivel:true,usuario_id:1},
                {id:2,nome: 'Banco', visivel:true,usuario_id:1},
                {id:3,nome: 'Conta de teste', visivel:true,usuario_id:1},
            ]

           }).as('contasSave')

        cy.inserirConta('{CONTROL}')
        // cy.wait('@saveConta').its('request.body.nome').should('not.be.empty') = verificou se o body está vazio
        // cy.wait('@saveConta').then(res => console.log(res)) = trouxe os dados da requisição no console
        cy.wait('@saveConta').then(() =>{
            console.log(reqStub.args[0][0])
                 expect(reqStub.args[0][0].request.body.nome).to.be.empty
                 expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')

        }) 
        cy.get(loc.MENSSAGE).should('contain', 'Conta inserida com sucesso')


    })

      //Should test colors
    it('Deve testar as cores', () => {
    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
            {"conta":"Conta para movimentacoes","id":1022078,"descricao":"Receita paga","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2022-02-22T03:00:00.000Z","data_pagamento":"2022-02-22T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":1096024,"usuario_id":28019,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta com movimentacao","id":1022079,"descricao":"Receita pendente","envolvido":"BBB","observacao":null,"tipo":"REC","data_transacao":"2022-02-22T03:00:00.000Z","data_pagamento":"2022-02-22T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":1096025,"usuario_id":28019,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":1022080,"descricao":"Despesa paga","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2022-02-22T03:00:00.000Z","data_pagamento":"2022-02-22T03:00:00.000Z","valor":"3500.00","status":true,"conta_id":1096026,"usuario_id":28019,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":1022081,"descricao":"Despesa pendente","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2022-02-22T03:00:00.000Z","data_pagamento":"2022-02-22T03:00:00.000Z","valor":"-1000.00","status":false,"conta_id":1096026,"usuario_id":28019,"transferencia_id":null,"parcelamento_id":null},
        ]
    })

    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')

    })
    
})
