/// <reference types="Cypress" />


it('A external test..', () => { // only executa apenas o teste indicado

})

describe('Shold group tests...', () => {
    describe('Shold group more specific testes...',() => {
        it.skip('A  specific external test..',() => {  // skip para não executar a linha do teste

        })
    } )
     
    describe('Shold group more specific testes 2...', () => {
        it('A specific test 2')
    } )
    it('A external test..',() => {

    })
})