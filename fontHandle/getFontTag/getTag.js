const data = require('../icons.json')
const fs = require('fs')
const currentCnTag = require('./tagCn.json')
const { pinyin } = require('pinyin')

let obj = {}
let objpy = {}
let pbjpyfl = {}
for(let k in data) {
    obj[k] = data[k].search.terms || []
    objpy[k] = data[k].search.terms || []
    pbjpyfl[k] = data[k].search.terms || []
    // 如果已经存在翻译好的，直接覆盖
    if (currentCnTag[k]) {
        obj[k] = currentCnTag[k]
        let py = []
        let pyfl = []
        currentCnTag[k].forEach(str => {
            const pyArr = pinyin(str, {
                style: "NORMAL",
    
            })
            let pyStr = ''
            pyArr.forEach(bean => {
                pyStr = `${pyStr} ${bean[0]}`
            })
            py.push(pyStr.trim())
            const pyflArr = pinyin(str, {
                style: "first_letter",
            })
            let pyflStr = ''
            pyflArr.forEach(bean => {
                pyflStr = `${pyflStr} ${bean[0]}`
            })
            pyfl.push(pyflStr.trim())
        })
        objpy[k] = py
        pbjpyfl[k] = pyfl
    }
}

if (!obj['wolai']) {
    // 将 wolai 自己的标签加入进去
    obj['wolai'] = ["wol.ai"]
    objpy['wolai'] = ["wol.ai"]
    pbjpyfl['wolai'] = ["wol.ai"]
}

// 当前版本不存在，之前版本存在的翻译也保留下来
for (let k in currentCnTag) {
    if (!obj[k]) {
        obj[k] = currentCnTag[k] || []
        objpy[k] = currentCnTag[k] || []
        pbjpyfl[k] = currentCnTag[k] || []
        // 如果已经存在翻译好的，直接覆盖
        if (currentCnTag[k]) {
            obj[k] = currentCnTag[k]
            let py = []
            let pyfl = []
            currentCnTag[k].forEach(str => {
                const pyArr = pinyin(str, {
                    style: "NORMAL",
        
                })
                let pyStr = ''
                pyArr.forEach(bean => {
                    pyStr = `${pyStr} ${bean[0]}`
                })
                py.push(pyStr.trim())
                const pyflArr = pinyin(str, {
                    style: "first_letter",
                })
                let pyflStr = ''
                pyflArr.forEach(bean => {
                    pyflStr = `${pyflStr} ${bean[0]}`
                })
                pyfl.push(pyflStr.trim())
            })
            objpy[k] = py
            pbjpyfl[k] = pyfl
        }
    }
}

fs.writeFile('./tagCn.json', JSON.stringify(obj) , (result) => {
    console.log(result)
})

fs.writeFile('./tagCnPY.json', JSON.stringify(objpy) , (result) => {
    console.log(result)
})

fs.writeFile('./tagCnPYFL.json', JSON.stringify(pbjpyfl) , (result) => {
    console.log(result)
})