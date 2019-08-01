// 双色球 数据分析
const path = require('path')
// console.log(path.resolve('./common/config/http.js'))
const { targetUrl } = require('./common/config')
const {requestFunc} = require('./common/config/httpcopy.js')
const { createWriteStreamEnd } = require('./common/config/createWriteStreamEnd.js')

createWriteStreamEnd.emit('init_ball')
requestFunc(targetUrl,false)
