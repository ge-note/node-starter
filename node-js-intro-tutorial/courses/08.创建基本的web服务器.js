const http = require('http');

// 创建 web 服务器实例
const server = http.createServer();

// 为服务器实例绑定 request 事件，监听客户端请求
server.on('request', function (req, res) {
  console.log('接收请求');

  // req 是请求对象，包含与客户端相关的数据和属性
  console.log('客户端请求 url：', req.url);
  console.log('客户端请求类型：', req.method);

  // res 是响应对象，包含与服务器相关的数据和属性
  // res.end() 向客户端发送指定的内容，并结束这次请求的处理过程
  // 发送中文时会出现乱码，需要设置编码格式
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end('响应内容');
});

// 启动服务器
server.listen(3000, function () {
  console.log('Server is running at http://127.0.0.1:3000');
});
