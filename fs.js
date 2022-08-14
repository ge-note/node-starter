/**
 * 文件系统
 */
const fs = require('fs');

/**
 * 打开文件 fs.open()
 *
 * 第二个参数
 * r  打开文件用于读取
 * r+ 打开文件用于读写
 * w+ 打开文件用于读写，将流定位到文件的开头，如果文件不存在则创建文件
 * a  打开文件用于写入，将流定位到文件的末尾，如果文件不存在则创建文件
 * a+ 打开文件用于读写，将流定位到文件的末尾，如果文件不存在则创建文件
 */

fs.open('./README.md', 'r', (err, fd) => {
  // fd：文件描述符
  console.log(fd);
});

/**
 * 打开文件同步方法 fs.openSync()
 */
try {
  // 直接返回文件描述符，而不是在回调中
  const fd = fs.openSync('./README.md', 'r');
  console.log(fd);
} catch (err) {
  console.error(err);
}

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 获取文件属性 fs.stat()
 */
fs.stat('./README.md', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(stats);
});

/**
 * 获取文件属性同步方法 fs.statSync()
 */
try {
  const stats = fs.statSync('./README.md');
  console.log(stats);
} catch (err) {
  console.error(err);
}

/**
 * 常用的文件信息
 *
 * stats.isFile()、stats.isDirectory()
 * stats.isSymbolicLink()
 * stats.size
 * ...
 */

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 文件路径
 */
const path = require('path');
const readme = './README.md';

/**
 * 从路径中获取信息
 */
// 获取文件的父文件夹
console.log(path.dirname(readme)); // .

// 获取文件名部分
console.log(path.basename(readme)); // README.md

// 获取文件的扩展名
console.log(path.extname(readme)); // .md

// 获取不带扩展名的文件名，basename() 指定第二个参数
console.log(path.basename(readme, path.extname(readme))); // README

/**
 * 使用路径
 */
// 连接多个路径
console.log(path.join('/', 'new-path', 'index.js')); // /new-path/index.js

// 获取相对路径的绝对路径
console.log(path.resolve('README.md')); // /Users/xxx/xxx/node-starter/README.md

// 指定第二个参数， resolve 会使用第一个作为第二个的基础
console.log(path.resolve('tmp', 'README.md')); // /Users/xxx/xxx/node-starter/tmp/README.md

// 如果第一个参数以 / 开头，则表示绝对路径
console.log(path.resolve('/etc', 'README.md')); // /etc/README.md

// 当包含 . .. / 之类的相对说明符时，会尝试计算实际的路径
console.log(path.normalize('/Users/..//README.md'));

// 注意：解析和规范化都不会检查路径是否存在，只是根据获得的信息来计算路径

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 读取文件 fs.readFile()
 */
fs.readFile('./README.md', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

/**
 * 读取文件同步方法 fs.readFileSync()
 */
try {
  const data = fs.readFileSync('./README.md', 'utf-8');
  console.log(data);
} catch (err) {
  console.error(err);
}

// 注意：fs.readFile() 和 fs.readFileSync() 会在返回数据之前将文件的全部内容读取到内存中
// 如果是大文件，最好使用 流

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 写入文件 fs.writeFile()
 */
const content = '新增内容';

fs.writeFile('./file.tmp', content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

/**
 * 写入文件同步方法 fs.writeFileSync()
 */
const syncContent = '同步方法新增内容';
try {
  fs.writeFileSync('./file.tmp', syncContent);
} catch (err) {
  console.error(err);
}

// 默认情况下，以上会直接替换文件的内容（如果文件已存在）

/**
 * 通过指定标志来修改默认行为
 */
const addContent = '追加内容';
fs.writeFile(
  './file.tmp',
  addContent,
  {
    flag: 'a+',
  },
  (err) => {}
);

/**
 * 追加到文件末尾 fs.appendFile()
 */
fs.appendFile('./file.tmp', '\n追加到文件末尾', (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

// 注意：追加大文件内容，使用 流

/* ***********************************  华丽分隔线  *********************************** */

/**
 * 使用文件夹
 */

// 检查文件夹是否存在
fs.access('../node-starter', () => {});

/**
 * 创建新的文件夹 fs.mkdir()、fs.mkdirSync()
 */
const folderName = './tmp';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}

/**
 * 读取文件夹的内容 fs.mkdir()、fs.mkdirSync()
 */
const folderPath = './tmp/';

fs.readdirSync(folderPath);

// 获取完整的路径
fs.readdirSync(folderPath).map((fileName) => {
  console.log(path.join(folderPath, fileName)); // tmp/file.tmp
});

// 过滤结果仅返回文件，排除文件夹
const isFile = (fileName) => {
  return fs.lstatSync(fileName).isFile();
};

fs.readdirSync(folderPath)
  .map((fileName) => {
    return path.join(folderPath, fileName);
  })
  .filter(isFile);

/**
 * 重命名文件夹 fs.rename()、fs.renameSync()
 */
fs.rename('./tmp/file', './tmp/file-rename', (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

/**
 * 删除文件夹 fs.rmdir()、fs.rmdirSync()
 */

// 如果文件夹中有内容，可以使用第三方模块，如 fs-extra
const fsExtra = require('fs-extra');

const folder = './tmp/todo-remove';

fsExtra.remove(folder, (err) => {
  console.error(err);
});
