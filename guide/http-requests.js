/**
 * 发送 HTTP 请求
 */

/**
 * 执行 GET 请求
 */
const https = require('https');

const options = {
  hostname: 'nodejs',
  port: 443,
  path: '/todos',
  method: 'GET',
};

// 创建 https 请求
const req = https.request(options, (res) => {
  console.log(`状态码：${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();

/**
 * 执行 POST 请求
 */
const https = require('https');

const data = JSON.stringify({
  todo: 'TODO',
});

const options = {
  hostname: 'nodejs',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = https.request(options, (res) => {
  console.log(`状态码：${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);

req.end();

// 也可以使用 axios 发送请求

// 如果需要获取 HTTP 请求的正文数据，可以使用第三方库，如 Express 的 body-parser 模块
