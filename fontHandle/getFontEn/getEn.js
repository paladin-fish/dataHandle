// import icons from './icons.json'

const data = require('./icons.json')
const fs = require('fs')

let obj = {}
for(let k in data) {
    obj[data[k].label] = ''
}
// console.log()
fs.writeFile('en.js', JSON.stringify(obj) , (result) => {
    console.log(result)
})