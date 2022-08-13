/**
 * 从命令行接收参数
 */
// 内置模块 readline
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question('请输入姓名：', (name) => {
	console.log('你好，', name);
	readline.close();
});

// 使用第三方库 inquirer
const inquirer = require('inquirer');
inquirer
	.prompt([
		{
			type: 'input',
			name: 'name',
			message: '请输入姓名：',
		},
	])
	.then((answers) => {
		console.log('你好，', answers['name']);
	});
