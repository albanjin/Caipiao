// 双色球 数据分析
// const path = require('path')
const {requestFunc} = require('./common/config/http.js')
const {allUrl} = require('./allurl.js')
// const { createWriteStreamEnd } = require('./common/config/createWriteStreamEnd.js')

// createWriteStreamEnd.emit('init_ball')
requestFunc(allUrl[0])

process.on('uncaughtException', (err) => {
    console.log(1, `捕获的异常：${err}\n`);
});
