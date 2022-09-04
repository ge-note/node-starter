// 导入 fs 模块，来操作文件
const fs = require('fs');

/**
 * 调用 fs.writeFile() 方法写入文件的内容
 * @param 读取文件的存放路径
 * @param 要写入的内容
 * @param 回调函数
 */
fs.writeFile('./files/02.txt', '02.写入文件', function (err) {
  // 如果写入成功，则 err 为 null
  // 如果写入失败，则 err 为错误对象
  if (err) {
    return console.log('写入失败：', err.message);
  }

  console.log('写入成功');
});
