// const bull = require('./ball.js')
// console.log(require('./ball.js'))



var buleball1 =  bull.filter(function(item) {
    return item['buleball'] == '01'
}) 

var blueballList = []
for(var i = 1; i < 16; i++){
    blueballList.push(i < 10 ? '0'+ i : `${i}`)
}
var redballList = []
for(var i = 1; i < 35; i++){
    redballList.push(i < 10 ? '0'+ i : `${i}`)
}

console.log(redballList)

function blueballListFunc (blueballList,buleball =  'buleball'){
    var blueballResultList = []
    for(let i = 0 ; i < blueballList.length ; i ++){
        var buleball1 =  bull.filter(function(item) {
            // item[buleball].includes('30') ?  console.log(item[buleball]) :''
            return item[buleball].includes(blueballList[i])
        })
        blueballResultList.push(buleball1.length) 
    }
    return blueballResultList
}


 
console.log(blueballListFunc(blueballList))
console.log(blueballListFunc(redballList,'redball'))