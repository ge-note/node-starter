/**
 * 需求
 * 客户端请求时钟页面，服务端返回相关文件
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();

// 访问路径带 /clock
// server.on('request', (req, res) => {
//   // 获取请求的 url
//   // /clock/index.html
//   // /clock/index.css
//   // /clock/index.js
//   const url = req.url;

//   // 把请求的 url 地址映射为具体文件的存放路径
//   const fpath = path.join(__dirname, './files', url);

//   // 根据映射后的文件路径，读取文件内容
//   fs.readFile(fpath, 'utf8', (err, dataStr) => {
//     // 读取失败，响应错误消息
//     if (err) {
//       return res.end('404 not found');
//     }

//     // 读取成功，返回内容
//     res.setHeader('Content-Type', 'text/html; charset=utf-8');
//     res.end(dataStr);
//   });
// });

// 优化访问路径，不带 /clock
server.on('request', (req, res) => {
  // 获取请求的 url
  // /clock/index.html
  // /clock/index.css
  // /clock/index.js
  const url = req.url;

  // 把请求的 url 地址映射为具体文件的存放路径
  let fpath = '';
  if (url === '/') {
    fpath = path.join(__dirname, './files/clock/index.html');
  } else {
    fpath = path.join(__dirname, './files/clock', url);
  }

  // 根据映射后的文件路径，读取文件内容
  fs.readFile(fpath, 'utf8', (err, dataStr) => {
    // 读取失败，响应错误消息
    if (err) {
      return res.end('404 not found');
    }

    // 读取成功，返回内容
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(dataStr);
  });
});

server.listen(80, () => {
  console.log('Server is running at http://127.0.0.1');
});
