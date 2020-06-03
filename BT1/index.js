/*
 * Sử dụng async await kết hợp với Promise để viết lại đoạn code trên. 
 * Gợi ý: Viết lại 1 async function làm 2 việc trên và chạy thử
 */
var fs = require('fs');
var axios = require('axios');
var promise = require('promise');
// fs.readFile(
//   './data.json', 
//   { encoding: 'utf8'}, 
//   function(err, data) {
//     console.log('Data loaded from disk', data);

//     axios.get('https://jsonplaceholder.typicode.com/todos/1')
//       .then(function(res) {
//         console.log('Data downloaded from url', res.data);
//       });
//   }
// );

//


function readFilePromise(path) {
    return new Promise(function (reslove, reject) {
        fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
            if (err) reject(err);
            else reslove(data);
        })
    })
}


async function main() {
    let gets = await axios({
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        responseType: 'stream',
    }).then(function (res) {
        console.log('Write Ok...');
        res.data.pipe(fs.createWriteStream('data.json'))
    })
    let read = await readFilePromise('data.json');
    return read;
}


main().then(function (res) {
    console.log(res);
})

