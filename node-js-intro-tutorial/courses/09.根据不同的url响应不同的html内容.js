const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  // 获取请求的 url
  const url = req.url;

  // 响应内容
  let content = '404 not found';

  // 根据 url 返回不同的内容
  if (url === '/' || url === '/index.html') {
    content = '<h1>首页</h1>';
  } else if (url === '/about.html') {
    content = '<h1>关于页面</h1>';
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(content);
});

server.listen(3000, () => {
  console.log('Server is running at http://127.0.0.1/3000');
});
