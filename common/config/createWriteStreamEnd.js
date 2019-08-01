const {EventEmitter} = require('events')
const fs = require('fs')
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const path = require('path')



const  {requestFunc} = require('./httpcopy.js')


const createWriteStreamEnd = new EventEmitter()
let urlListStr = []

let index = 0

createWriteStreamEnd.on('start_next_step', () => {
    const {allUrl} = require(path.resolve('allurl.js')) || []
    index ++ 
    if(index < allUrl.length){
        requestFunc(allUrl[index])
    }else{
        
        fs.appendFile(path.resolve('ball.js'),']',(err) =>{
            if(err) 
                console.log(err) 
            else
                console.log("处理结束")
         })
    }
})

createWriteStreamEnd.on('allurl',data =>{
    console.log(data)
    createWriteStreamEnd.removeListener('allurl',()=>{console.log('122')})
    fs.writeFileSync(path.resolve('allurl.js'),`module.exports.allUrl =${data}`)
})

createWriteStreamEnd.on('sethtml', (html) => {
    
    const dom = new JSDOM(`${html}`)
    const $ = require('jquery')(dom.window)
    const targetArr = $('.ball_box01 ul > li')

    let id = $('.td_title01 .cfont2 strong')[0].textContent
    let textContent = []
    for (let i = 0; i < targetArr.length; i++) {
        textContent.push(targetArr[i].textContent)
    }

    createWriteStreamEnd.emit('set_ball',{
        id,
        redball:textContent.slice(0,6),
        buleball:textContent[6]
    })
    let urlList = $('.iSelectList a')
    
    for (let i = 0; i < urlList.length; i++) {
        urlListStr.push(urlList[i].href)
    }

})

createWriteStreamEnd.on('inihtml', (html) => {
    
    const dom = new JSDOM(`${html}`)
    const $ = require('jquery')(dom.window)
    
    let urlList = $('.iSelectList a')
    
    for (let i = 0; i < urlList.length; i++) {
        urlListStr.push(urlList[i].href)
    }

    fs.writeFileSync(path.resolve('allurl.js'),`
    module.exports.allUrl = ${JSON.stringify(urlListStr)}
    `)
    

})

createWriteStreamEnd.on('init_ball',(data)=>{
    fs.writeFileSync(path.resolve('ball.js'),'var bull=[{}')
})

createWriteStreamEnd.on('set_ball',(data)=>{
    fs.appendFile(path.resolve('ball.js'),',\n'+ JSON.stringify(data),(err)=>{
        if(err)
            console.log(err)
        else{
            console.log(`==================================== ${data.id}加载完毕 ====================================`)
            createWriteStreamEnd.emit('start_next_step')
        } 

    })
})


module.exports = {
    createWriteStreamEnd
}