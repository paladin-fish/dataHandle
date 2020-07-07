const data = require('../icons.json')
const fs = require('fs')

let obj = {}
for(let k in data) {
    obj[k] = data[k].search.terms || []
}
// console.log()
fs.writeFile('./fontHandle/getFontTag/tag.js', JSON.stringify(obj) , (result) => {
    console.log(result)
})