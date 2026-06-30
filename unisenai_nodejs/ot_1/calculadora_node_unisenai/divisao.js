const divisao = function(a,b){
    if (b === 0){
        throw new Error ("Divisão por zero não é permitida")
    } 
    
    return a/b;
}
module.exports = divisao;