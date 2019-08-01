



const path = require('path')
const url = require('url')
// const fs = require('fs')
const zlib = require('zlib')

const requestFunc = (targetUrl,canSetHtml = true) => {
    const {createWriteStreamEnd} = require(path.resolve('common/config/createWriteStreamEnd.js'))

    const http = url.parse(targetUrl)['protocol'] == 'https:' ? require('https') : require('http')

    const UserAgentList = [
        `Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/${Math.floor(Math.random() * 537)}.36 (KHTML, like Gecko) Chrome/${Math.floor(Math.random() * 53)}.0.2763.0 Safari/${Math.floor(Math.random() * 537)}.36`,
        `Mozilla/5.0 (Windows NT 6.1; WOW64; rv:6.0) Gecko/${Math.floor(Math.random() * 20100101)} Firefox/6.0`,
        `Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/${Math.floor(Math.random() * 534)}.50 (KHTML, like Gecko) Version/5.1 Safari/${Math.floor(Math.random() * 534)}.50`,
        `Opera/${Math.floor(Math.random() * 9)}.80 (Windows NT 6.1; U; zh-cn) Presto/2.9.${Math.floor(Math.random() * 168)} Version/${Math.floor(Math.random() * 11)}.50`,
        `Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; GTB7.0)`,
        `Mozilla/5.0 (Windows; U; Windows NT 6.1; ) AppleWebKit/${Math.floor(Math.random() * 534)}.12 (KHTML, like Gecko) Maxthon/3.0 Safari/${Math.floor(Math.random() * 534)}.12`
    ]

    let UserAgentIndex = Math.floor(Math.random() * UserAgentList.length )

    const config = {
        ...url.parse(targetUrl),
        headers: {
            "Accept": " text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "text/html; charset=gb2312",
            "User-Agent": UserAgentList[UserAgentIndex]
            // "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
        }
    }
    
    const request = http.get(config)

    request.on('response', (response) => {

        var html='',output;

        switch (response.headers['content-encoding']) {
            // 或者, 只是使用 zlib.createUnzip() 方法去处理这两种情况
            case 'gzip':
                var gzip=zlib.createGunzip();
                response.pipe(gzip);
                output=gzip;
                break;
            case 'deflate':
                response.pipe(zlib.createInflate()).pipe(output);
                break;
            default:
                response.pipe(output);
                break;
        }

        output.on('data',(data)=>{
            data=data.toString('utf-8');
            html+=data;
        });
        output.on('end',()=>{
            // console.log(html);
            if(canSetHtml)
                createWriteStreamEnd.emit('sethtml',html)
            else
                createWriteStreamEnd.emit('inihtml',html)
        })

    }).on('end', () => {
        console.log('end')
    })

}

module.exports = {
    requestFunc
}

