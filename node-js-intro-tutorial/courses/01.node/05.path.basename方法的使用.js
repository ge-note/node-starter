/**
 * path.basename() 可以从一个文件路径中，获取到文件的名称部分
 */
const path = require('path');

const fpath = '/a/b/c/index.html';

const fullName = path.basename(fpath);

console.log(fullName); // index.html

const nameWithoutExt = path.basename(fpath, '.html');

console.log(nameWithoutExt); // index
