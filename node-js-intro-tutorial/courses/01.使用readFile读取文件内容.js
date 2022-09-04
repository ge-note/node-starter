// 导入 fs 模块，来操作文件
const fs = require('fs');

/**
 * 调用 fs.readFile() 方法读取文件
 * @param 读取文件的存放路径
 * @param 读取文件时采用的编码格式，一般默认指定 utf8
 * @param 回调函数，拿到读取失败和成功的结果
 */
fs.readFile('./files/01.txt', 'utf8', function (err, dataStr) {
  // 如果读取成功，则 err 为 null
  // 如果读取失败，则 err 为错误对象，dataStr 为 undefined
  if (err) {
    return console.log('读取失败：', err.message);
  }

  console.log('读取成功：', dataStr);
});
