var http = require('http'); // 内置的 http 模块提供了 HTTP 服务器和客户端功能
var fs = require('fs'); // 内置的 fs 模块提供了文件系统功能
var path = require('path'); // 内置的 path 模块提供了与文件系统路径相关的功能
var mime = require('mime'); // 附加的 mime 模块有根据文件扩展名得出 MIME 类型的能力
var cache = {}; // 用来缓存文件中的数据

/**
 * 创建 HTTP 服务
 */
var server = http.createServer(function (request, response) {
  var filePath = false;

  if (request.url == '/') {
    // 没有输入具体路径时，返回默认文件
    filePath = 'public/index.html';
  } else {
    // 将 URL 路径转为文件的相对路径
    filePath = 'public' + request.url;
  }

  var absPath = './' + filePath;

  serveStatic(response, cache, absPath);
});

// 启动 HTTP 服务
server.listen(3000, function () {
  console.log('服务已启动，http://127.0.0.1:3000');
});

/**
 * 辅助函数
 */
// 静态文件服务
function serveStatic(response, cache, absPath) {
  // 检查文件是否已缓存在内存中
  if (cache[absPath]) {
    // 从内存缓存中返回文件
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, function (exists) {
      // 检查文件是否存在
      if (exists) {
        // 从硬盘中读取文件
        fs.readFile(absPath, function (err, data) {
          if (err) {
            send404(response);
          } else {
            // 缓存文件
            cache[absPath] = data;
            // 返回文件
            sendFile(response, absPath, data);
          }
        });
      } else {
        // 文件不存在返回 404
        send404(response);
      }
    });
  }
}

// 请求文件不存在时，发送 404 错误
function send404(response) {
  response.writeHead(404, {
    'Content-Type': 'text/plain;charset=UTF-8',
  });
  response.write('404: 未找到资源');
  response.end();
}

// 发送文件数据
function sendFile(response, filePath, fileContents) {
  response.writeHead(200, {
    'Content-Type': mime.lookup(path.basename(filePath)) + ';charset=UTF-8',
  });
  response.end(fileContents);
}

/**
 * 设置 Socket.IO 服务器
 */
var chatServer = require('./lib/chat-server');

chatServer.listen(server);
