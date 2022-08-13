/**
 * 获取命令行参数
 */
// 获取所有参数
process.argv.forEach((val, index) => {
	console.log(`${index}: ${val}`);
});

// 排除前两项后的参数
const args = process.argv.slice(2);

// node accept-arguments-from-command-line.js --name=joe
console.log(args); // ['name=joe']

console.log(args[0]); // name=ge

/**
 * 获取解析后的参数
 */
const parseArgs = require('minimist')(process.argv.slice(2));

// node accept-arguments-from-command-line.js --name=joe
console.log(parseArgs.name); // joe
