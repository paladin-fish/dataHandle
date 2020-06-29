const fs = require('fs')

const data = require('./icons.json')
const iconTypeSrc = require('./newTypeSrc.json')
const enData = require('./en.json')
const path = require('path')
const arr = {
    categories: [],
    fonts:{}
}

for(var key in iconTypeSrc) {
    let _obj = {
        name: key,
        cnName: iconTypeSrc[key].name,
        fonts: [],
    }
    iconTypeSrc[key].fonts.map(bean => {
        if (data[bean]) {
            data[bean].free.map(type => {
                let classType = type === 'solid' ? 'fas' : type === 'regular' ? 'far' : 'fab' 
                let unicode = data[bean].unicode;
                let _name = '&#x' + unicode.toUpperCase() + ';'
                let newKey = `${classType}-${bean}-${_name}`
                if (_obj.fonts.includes(newKey)) {
                    return
                }
                let keyword = data[bean].search.terms || []
                let label = data[bean].label
                // if (enData[data[bean].label]) {
                //     keyword.unshift(enData[data[bean].label])
                // }
                if (!enData[data[bean].label]) {
                    console.log('unmatch font: ', data[bean].label, '---', enData[data[bean].label])
                } else {
                    !keyword.includes(label)&&(keyword.push(label))
                    label = enData[data[bean].label];
                }
                let obj = {
                    name: bean,
                    label: label,
                    unicode: data[bean].unicode,
                    searchText: data[bean].search.terms.join(','),
                    keyword: keyword,
                }
                _obj.fonts.push(newKey)
                if (!arr.fonts[newKey]) {
                    arr.fonts[newKey] = obj
                }
            })
        }
    })
    arr.categories.push(_obj)
}

// for(var key in data) {
//     (!arr[data[key].free && data[key].free[0]]) && (arr[data[key].free && data[key].free[0]] = [])
//     let obj = {
//         name: key,
//         label: data[key].label,
//         search: data[key].search.terms.join(',')
//     }
//     arr[data[key].free && data[key].free[0]].push(obj)
// }

// for(let k in arr) {
//     console.log(arr[k].length)
// }

fs.writeFile(path.join(__dirname,'./fontList.js'), JSON.stringify(arr), (a,b) => {
    console.log(a,b)
})
// console.log('data==',arr)