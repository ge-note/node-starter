/**
 * 输出到命令行
 */

/**
 * console.log()
 *
 * %s 格式化变量为字符串
 * %d 格式化变量为数字
 * %i 格式化变量为其整数部分
 * %o 格式化变量为对象
 */
console.log('我的 %s 已经 %d 岁', '猫', 2); // 我的 猫 已经 2 岁

console.log('%o', Number); // %o function Number() { [native code] }

/**
 * 元素计数 console.count()
 */
const countX = 1;

console.count('X 的值为 ' + countX + ' 且已经检查了几次？');

const oranges = ['橙子', '橙子'];

oranges.forEach((fruit) => {
	console.count(fruit);
});

/**
 * 打印堆栈踪迹 console.trace()
 */
const fn1 = () => console.trace();
const fn2 = () => fn1();
fn2();

/**
 * 计算耗时 console.time() console.timeEnd()
 */
const doSomething = () => console.log('计算耗时');
const measureDoingSomething = () => {
	console.time('doSomething()');
	doSomething();
	console.timeEnd('doSomething()');
};
measureDoingSomething(); // 计算耗时 doSomething(): 0.013ms

/**
 * 添加颜色
 */
// 使用转义符
console.log('\x1b[33m%s\x1b[0m', '你好');

// 使用 chalk 库
// chalk >= 5.0 版本已换成 ESM
const chalk = require('chalk');
console.log(chalk.green('你好'));

/**
 * 创建进度条
 */
const ProgressBar = require('progress');
const bar = new ProgressBar(':bar', {
	total: 30,
});
const timer = setInterval(() => {
	bar.tick();
	if (bar.complete) {
		clearInterval(timer);
	}
}, 100);
