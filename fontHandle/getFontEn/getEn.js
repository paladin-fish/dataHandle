const data = require('../icons.json')
const fs = require('fs')
const { pinyin } = require('pinyin')
const currentCn = require('./cn.json')

let obj = {}
let objpy = {}
let pbjpyfl = {}
for(let k in data) {
    obj[data[k].label] = ''
    objpy[data[k].label] = ''
    pbjpyfl[data[k].label] = ''
    const _str = currentCn[data[k].label]
    if (_str) {
        obj[data[k].label] = _str
        const pyArr = pinyin(_str, {
            style: "NORMAL",

        })
        let pyStr = ''
        pyArr.forEach(bean => {
            pyStr = `${pyStr} ${bean[0]}`
        })
        objpy[data[k].label] = pyStr.trim()
        const pyflArr = pinyin(_str, {
            style: "first_letter",
        })
        let pyflStr = ''
        pyflArr.forEach(bean => {
            pyflStr = `${pyflStr} ${bean[0]}`
        })
        pbjpyfl[data[k].label] = pyflStr.trim()
    }
}

if (!obj['Wolai']) {
    obj['Wolai'] = "我来"
    objpy['Wolai'] = "wo lai"
    pbjpyfl['Wolai'] = "w l"
}

for (let k in currentCn) {
    if (!obj[k]) {
        obj[k] = ''
        objpy[k] = ''
        pbjpyfl[k] = ''
        const _str = currentCn[k]
        if (_str) {
            obj[k] = _str
            const pyArr = pinyin(_str, {
                style: "NORMAL",

            })
            let pyStr = ''
            pyArr.forEach(bean => {
                pyStr = `${pyStr} ${bean[0]}`
            })
            objpy[k] = pyStr.trim()
            const pyflArr = pinyin(_str, {
                style: "first_letter",
            })
            let pyflStr = ''
            pyflArr.forEach(bean => {
                pyflStr = `${pyflStr} ${bean[0]}`
            })
            pbjpyfl[k] = pyflStr.trim()
        }
    }
}

fs.writeFile('./cn.json', JSON.stringify(obj) , (result) => {
    console.log(result)
})

fs.writeFile('./cnPY.json', JSON.stringify(objpy) , (result) => {
    console.log(result)
})

fs.writeFile('./cnPYFL.json', JSON.stringify(pbjpyfl) , (result) => {
    console.log(result)
})