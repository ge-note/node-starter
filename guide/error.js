/**
 * 错误处理
 */
// 创建异常
// 在 Node.js 中，不抛出字符串，而仅抛出 Error 对象
throw new Error('出现异常');

// 或者
class NotEnoughCoffeeError extends Error {
  // ...
}
throw new NotEnoughCoffeeError();

// 捕获未捕获的异常
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常', err);
  process.exit(1);
});

// try catch 处理

// promise 异常
