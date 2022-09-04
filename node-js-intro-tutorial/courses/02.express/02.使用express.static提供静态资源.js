const express = require('express');

const app = express();

// 调用 express.static() 对外提供静态资源
// 如果要托管多个静态资源目录，可以多次调用 express.static()，会根据添加目录的顺序查找文件

// 将 public 目录下的所有文件对外提供
app.use(express.static('./public'));

// 挂载路径前缀，访问时需要多增加路径，名称可自定义
// app.use('/static', express.static('./public'));

app.listen(3000, () => {
  console.log('Express server running at http://127.0.0.1:3000');
});
