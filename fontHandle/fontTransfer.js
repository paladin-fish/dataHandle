const fs = require('fs')

// 原始icon数据
const data = require('./icons.json')
// 分类信息
const iconTypeSrc = require('./newTypeSrc.json')
// 图标描述的翻译/拼音/拼音首字母
const enData = require('./getFontEn/cn.json')
const enPyData = require('./getFontEn/cnPY.json')
const enPyFLData = require('./getFontEn/cnPYFL.json')
const path = require('path')
// 图片关键词的翻译/拼音/拼音首字母
const cnTag = require('./getFontTag/tagCn.json')
const cnPyTag = require('./getFontTag/tagCnPY.json')
const cnPyFirstLetterTag = require('./getFontTag/tagCnPYFL.json')
const arr = {
    categories: [],
    fonts:{}
}
const expandLabelData = {
    'journal-whills': ["怀尔日志","惠尔斯志事","怀尔斯日志"]
} 

const expandIcon = {
    "wolai": {
        "search": {
          "terms": []
        },
        "styles": [
          "brands"
        ],
        "unicode": "f400",
        "label": "Wolai",
        "free": [
          "brands"
        ]
      }
}
let counts = new Set()
for(var key in iconTypeSrc) {
    if (iconTypeSrc[key].hidden) {
        console.log('iconTypeSrc[key].hidden=-', iconTypeSrc[key].hidden, key)
        continue
    }
    let _obj = {
        name: key,
        cnName: iconTypeSrc[key].name,
        fonts: [],
    }
    // counts = counts + iconTypeSrc[key].fonts.length
    iconTypeSrc[key].fonts.map(bean => {
        let currentBean = data[bean] || expandIcon[bean]
        if (currentBean) {
            currentBean.free.map(type => {
                let classType = type === 'solid' ? 'fas' : type === 'regular' ? 'far' : 'fab' 
                let unicode = currentBean.unicode;
                let _name = '&#x' + unicode.toUpperCase() + ';'
                let newKey = `${classType}-${bean}-${_name}`
                counts.add(newKey)
                if (_obj.fonts.includes(newKey)) {
                    return
                }
                let keyword = currentBean.search.terms || []
                let label = currentBean.label
                // if (enData[currentBean.label]) {
                //     keyword.unshift(enData[currentBean.label])
                // }
                if (expandLabelData[bean]) {
                    keyword = keyword.concat(expandLabelData[bean])
                }
                if (cnTag[bean]) {
                    keyword = keyword.concat(cnTag[bean])
                }
                if (cnPyTag[bean]) {
                    let array = cnPyTag[bean]
                    array = array.map(item => item.replace(/ /g, ''))
                    keyword = keyword.concat(array)
                }
                if (cnPyFirstLetterTag[bean]) {
                    let array = cnPyFirstLetterTag[bean]
                    array = array.map(item => item.replace(/ /g, ''))
                    keyword = keyword.concat(array)
                }
                if (enPyData[currentBean.label]) {
                    let _text = enPyData[currentBean.label]
                    _text = _text.replace(/ /g, '')
                    keyword.push(_text)
                }
                if (enPyFLData[currentBean.label]) {
                    let _text = enPyFLData[currentBean.label]
                    _text = _text.replace(/ /g, '')
                    keyword.push(_text)
                }
                if (!enData[currentBean.label]) {
                    console.log('unmatch font: ', currentBean.label, '---', enData[currentBean.label])
                } else {
                    !keyword.includes(label)&&(keyword.push(label))
                    label = enData[currentBean.label];
                }
                keyword = [...new Set(keyword)]
                let obj = {
                    name: bean,
                    label: label,
                    unicode: currentBean.unicode,
                    searchText: currentBean.search.terms.join(','),
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
console.log(counts.size)

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