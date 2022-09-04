/**
 * 在使用 fs 模块操作文件时，如果提供的操作路径是以 ./ 或 ../ 开头的相对路径
 * 很容易出现路径动态拼接错误的问题
 *
 * 原因：
 * 代码在运行时，会以执行 node 命令时所处的目录，动态拼接出被操作文件的完整路径
 *
 * 解决方案：
 * 在使用 fs 模块操作文件时，直接提供完整的路径，不要出现 ./ 或 ../ 开头的相对路径
 */

const fs = require('fs');

// 会出现路径拼接错误问题
// 演示：在不同的目录中执行该文件
// fs.readFile('./files/01.txt', 'utf8', function (err, dataStr) {
//   if (err) {
//     return console.log('读取失败：', err.message);
//   }

//   console.log('读取成功：', dataStr);
// });

/* ***********************************  华丽分隔线  *********************************** */

// 解决方案：使用完整路径
// fs.readFile('完整路径', 'utf8', function (err, dataStr) {
//   if (err) {
//     return console.log('读取失败：', err.message);
//   }

//   console.log('读取成功：', dataStr);
// });

/* ***********************************  华丽分隔线  *********************************** */

// __dirname 表示当前文件所处的目录
console.log('当前文件所处的目录：', __dirname);

fs.readFile(__dirname + '/files/01.txt', 'utf8', function (err, dataStr) {
  if (err) {
    return console.log('读取失败：', err.message);
  }

  console.log('读取成功：', dataStr);
});
