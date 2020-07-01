
var cnData = require('./cnData.json')

var twEmoji = require('./twitter.json')
const fs = require('fs')
const path = require('path')
let nullData = []
for(let k in twEmoji.emojis) {
    let _unified = twEmoji.emojis[k].b
    let _bean = cnData[_unified]

    if (!_bean && _unified.endsWith("-FE0F")) {
        let uniArr = _unified.split('-')
        uniArr.pop()
        _unified = uniArr.join('-')
        _bean = cnData[_unified]
    }
    
    if (_bean) {
        !twEmoji.emojis[k].n && (twEmoji.emojis[k].n = [])
        twEmoji.emojis[k].n.push(_bean.name)
        !twEmoji.emojis[k].j&& (twEmoji.emojis[k].j = [])
        let arr = _bean.search.split(',') || []
        twEmoji.emojis[k].j = [...arr, ...twEmoji.emojis[k].j]
    } else {
        let obj = { unified: twEmoji.emojis[k].b, id: k}
        nullData.push(obj)
    }
}
console.log(nullData)
console.log('path==', path.join(__dirname,'./minCnAndEmoji/emoji.json'))
fs.writeFile(path.join(__dirname,'./emoji.json'), JSON.stringify(twEmoji), (a,b) => {
    console.log(a,b)
})

fs.writeFile(path.join(__dirname,'./nullemoji.json'), JSON.stringify(nullData), (a,b) => {
    console.log(a,b)
})