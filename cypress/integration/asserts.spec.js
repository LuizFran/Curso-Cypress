/// <reference types="Cypress" />
// chegagens
it('Equalyt', () => {
    const a = 1;

    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(a).to.be.equal(1);
    expect('a').not.to.be.equal('b')
})

it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).not.to.be.null;
    expect(c).to.be.undefined
})


it('Object Equality', () =>{

const obj = {
    a:1,
    b:2,
}
expect(obj).equal(obj)
expect(obj).equals(obj)
expect(obj).eq(obj)
expect(obj).to.be.equal(obj)
expect(obj).to.be.deep.equal({a: 1, b: 2}) // deep & eql checa as propriedades 
expect(obj).to.be.eql({a: 1, b:2})
expect(obj).include({ a: 1 })
expect(obj).to.have.property('b', 2)
expect(obj).to.not.be.empty // empty verifica se o obj não está vazio
expect({}).to.be.empty // empty + ({}) confirma que o objeto está vazio

})

it('Arrays', () => {
    const arr = [1,2,3]
    expect(arr).to.have.members([1,2,3]) // espero que array possua os membros 1,2,3...
    expect(arr).to.include.members([1,3])
    expect(arr).to.not.be.empty
    expect([]).to.be.empty
})

it('Types', () => {

const num = 1
const str = 'String'

expect(num).to.be.a('number')
expect(str).to.be.an('string')
expect({}).to.be.an('object')
expect([]).to.be.an('array')
} )

it('String', () => {
const str = 'String de teste'

expect(str).to.be.equal('String de teste')
expect(str).to.be.length(15)
expect(str).to.be.contains('de')
expect(str).to.match(/de/) // reject
expect(str).to.match(/^String/) // ^ indica que deve inicia
expect(str).to.match(/teste$/) // $ indica que deve finalizar com: 
expect(str).to.match(/.{15}/) // .{} Determina o tamanho desejado
expect(str).to.match(/\w+/) // Verifica se existem apenas letras
expect(str).to.match(/\D+/) // Verifica se não tem números
})

it('Numbers', () => {
    const number = 4
    const floatNumber = 5.2123

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3) // above: acima
    expect(number).to.be.below(7) // below: abaixo
    expect(floatNumber).to.be.equal(5.2123)
    expect(floatNumber).to.be.closeTo(5.2, 0.1)
    expect(floatNumber).to.be.above(5)

})