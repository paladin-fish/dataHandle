var fs = require('fs');
var readline = require('readline');

/*
* 按行读取文件内容
* 返回：字符串数组
* 参数：fReadName:文件名路径
*      callback:回调函数
* */
function readFileToArr(fReadName,callback){
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input:fRead
    });
    let obj = {}
    objReadline.on('line',function (line) {
        // console.log('line:'+ line);
        let arr = line.split(',')

      let unified = emojiToUnicode(arr[0], 0, '',arr[1] == '数字符号');
    //   console.log(arr[0], arr[1],unified)
        let _list = arr[2]&&arr[2].split('，') || []
    _list.unshift(arr[1])
    obj[unified] = { name: arr[1], search: _list.join(',') || ''}
    if (pyList[unified]) {
        obj[unified].search = `${(obj[unified].search || '')},${pyList[unified]}`
    }
    if (pyflList[unified]) {
        obj[unified].search = `${(obj[unified].search || '')},${pyflList[unified]}`
    }
    unified = ''
    });
    objReadline.on('close',function () {
       // console.log(arr);
        callback(obj);
    });
}


/*
* 按行读取文件内容
* 返回：字符串数组
* 参数：fReadName:文件名路径
*      callback:回调函数
* */
function readFileGetKeyWordToArr(fReadName, _object, callback){
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input:fRead
    });
    let obj = {}
    objReadline.on('line',function (line) {
        // console.log('line:'+ line);
        let arr = line.split(',')

      let unified = emojiToUnicode(arr[0], 0, '',arr[1] == '数字符号');
    //   console.log(arr[0], arr[1],unified)
        let _list = arr[2]&&arr[2].split('，') || []
    _list.unshift(arr[1])
    _object[unified] = `${(_list.join(',') || '')}`
    unified = ''
    });
    objReadline.on('close',function () {
       // console.log(arr);
        callback(_object);
    });
}

function emojiToUnicode(emoji, count, str, show){

    let L = emoji.codePointAt(count).toString(16).toUpperCase()

    count = count +1
    if(show){
        console.log('l===',emoji,str, L,emoji.codePointAt(count))
    }
    if(L.startsWith('D')){

    } else {
        if (L.length < 4) {
            L = '0000' + L;
            L = L.slice(L.length - 4)
        }
        str = str? `${str}-${L}`: L
    }
    if(emoji.codePointAt(count)) {
        return emojiToUnicode(emoji, count, str, show)
    }

  return str
}
const pyList = {}
const pyflList = {}
let pyflag = false
let pyflflag = false
readFileGetKeyWordToArr('./pinyindata.js', pyList, (_object) => {
    fs.writeFile('./newpyData.js',JSON.stringify(_object),(result) => {
        console.log(result)
        pyflag = true
        if (pyflag && pyflflag) {
            readFileToArr('./data.js',(line) => {
                // console.log(line)
                fs.writeFile('./newData.js',JSON.stringify(line),(result) => {
                    console.log(result)
                })
            })
        }
    })
})
readFileGetKeyWordToArr('./pyfirstletterdata.js', pyflList, (_object) => {
    fs.writeFile('./newpyflData.js',JSON.stringify(_object),(result) => {
        console.log(result)
        pyflflag = true
        if (pyflag && pyflflag) {
            readFileToArr('./data.js',(line) => {
                // console.log(line)
                fs.writeFile('./newData.js',JSON.stringify(line),(result) => {
                    console.log(result)
                })
            })
        }
    })
})
