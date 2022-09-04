/**
 * 目标
 * 将素材文件 materials/clock.html 拆分为 html、css、js 三个文件，并且 html 能正常显示
 */
const fs = require('fs');
const path = require('path');

// 定义正则表达式
// \s 匹配所有空白符
// \S 匹配所有非空白符
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

// 读取文件
fs.readFile(
  path.join(__dirname, '../materials/clock.html'),
  'utf8',
  function (err, dataStr) {
    if (err) {
      return console.log('读取文件失败：', err.message);
    }

    // 读取文件成功，解析出对应文件
    resolveCSS(dataStr);
    resolveJS(dataStr);
    resolveHTML(dataStr);
  }
);

// 解析 CSS
function resolveCSS(htmlStr) {
  // 使用正则匹配需要提取的内容
  // exec() 如果匹配到，则返回一个数组，第一个值即为需要获取的内容
  const matchContent = regStyle.exec(htmlStr);

  // 删除 <style>、</style> 字符串
  const content = matchContent[0]
    .replace('<style>', '')
    .replace('</style>', '');

  // 写入文件
  // 注意：需要先创建 clock 目录
  fs.writeFile(
    path.join(__dirname, './files/clock/index.css'),
    content,
    function (err) {
      if (err) {
        return console.log('写入 CSS 失败', err.message);
      }
      console.log('写入 CSS 成功');
    }
  );
}

// 解析 JS
function resolveJS(htmlStr) {
  const matchContent = regScript.exec(htmlStr);

  const content = matchContent[0]
    .replace('<script>', '')
    .replace('</script>', '');

  fs.writeFile(
    path.join(__dirname, './files/clock/index.js'),
    content,
    function (err) {
      if (err) {
        return console.log('写入 JS 失败', err.message);
      }
      console.log('写入 JS 成功');
    }
  );
}

// 解析 HTML
function resolveHTML(htmlStr) {
  // 将 html 中的 style、script 替换为外部引入的 link 和 script
  const content = htmlStr
    .replace(regStyle, '<link rel="stylesheet" href="./index.css" />')
    .replace(regScript, '<script src="./index.js"></script>');

  // 写入文件
  fs.writeFile(
    path.join(__dirname, './files/clock/index.html'),
    content,
    function (err) {
      if (err) {
        return console.log('写入 HTML 失败', err.message);
      }
      console.log('写入 HTML 成功');
    }
  );
}
