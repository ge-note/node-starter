const express = require('express');
const cors = require('cors');
const userRouter = require('./router/user');

// 创建服务器实例对象
const app = express();

// 配置解决跨域中间件
app.use(cors());

// 配置解析表单数据的中间件
// 注意：这个中间件只能解析 application/x-www-form-urlencoded 格式
app.use(express.urlencoded({ extended: false }));

// 使用用户路由模块
app.use('/api', userRouter);

app.listen(3000, () => {
  console.log('Api-Server running at http://127.0.0.1:3000');
});
