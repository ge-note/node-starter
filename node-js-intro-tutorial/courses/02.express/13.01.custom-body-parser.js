// 导入内置的 querystring 模块
const qs = require('querystring');

const customBodyParser = (req, res, next) => {
  console.log('解析表单数据中间件');
  // 保存客户端发送的请求体数据
  let str = '';

  // 监听 req 的 data 事件
  req.on('data', (chunk) => {
    str += chunk;
  });

  // 监听 req 的 end 事件
  req.on('end', () => {
    // 数据接收完成，str 中存放的是完整的请求体数据
    console.log(str);

    // 把字符串格式化为对象
    const body = qs.parse(str);

    // 将解析出来的请求体数据，挂载为 req.body，其他中间件或路由都可以调用
    req.body = body;

    next();
  });
};

module.exports = customBodyParser;
