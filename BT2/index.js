const axios = require('axios');

// Giải thích điểm khác nhau giữa 1 và 2:
// 1. Chạy thông qua for
async function fetchUrls(urls) {
    console.time('Time!!!');
    const results = [];
    for (const url of urls) {
        const res = await axios.get(url);
        results.push(res.data);
    }
    console.timeEnd('Time!!!');
    return results;
}


// 2. Chạy thông qua Promise.all

async function fetchUrlsParallel(urls) {
    console.time('Time...');
    const results = await Promise.all(
        urls.map(function (url) {
            return axios.get(url);
        })
    );
    console.timeEnd('Time...');
    return results;
    
}


// Chạy thử 2 hàm trên với đầu vào dưới đây và so sánh tốc độ
const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3'
];

/* 
    fetchUrlsParallel sẽ nhanh hơn fetchUrls 
    - Theo e nghĩ là fetchUrlsParallel sẽ chạy thông qua Promise.all và get data, gán luôn vào result thông qua map
    - Cón fetchUrls get data, lặp qua từng phần tử, rồi push vào mảng
*/
fetchUrls(urls).then((res) => console.log('Done', res));
fetchUrlsParallel(urls).then((res) => console.log('Done 2', res));