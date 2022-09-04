/**
 * path.join() 拼接路径
 */
const path = require('path');

// 注意：../ 会抵消前面的路径
const pathStr = path.join('/a', '/b/c', '../', './d', 'e');

console.log(pathStr); // /a/b/d/e

const pathStr2 = path.join(__dirname, './files/01.txt');

console.log(pathStr2); // 当前文件所处目录/files/01.txt

// 凡是涉及到路径拼接的操作，都使用 path.join() 处理
