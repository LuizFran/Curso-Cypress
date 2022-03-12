/// reference types="cypress" />


it('Sem testes, ainda', () => { })

const getSomething = () => {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      resolve (13);
  }, 1000)
  
  })
    
}

const system = () => {
console.log('init');
const prom = getSomething();
prom.then(some => {
   console.log('Something  is ${some}' )
})
console.log('end')

}
system();



// exemplo async + await 

//const system = async () => {
 // console.log('init');
  //const some = await getSomething();
    // console.log('Something  is ${some}' )
  //console.log('end')
  //}
  //system();
  


// exemplos : callback 
//const getSomething = (callback) => {
  //  setTimeout (() => {
    //    callback(12);
    //}, 1000)
//}

//const system = () => {
  //   console.log('init');
    // const something = getSomething();
     //console.log('Something is ${something}');
     //console.log('end')
//}

