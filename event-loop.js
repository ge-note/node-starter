/**
 * 事件循环
 */
// 调用堆栈
const foo = () => console.log('foo');

const bar = () => console.log('bar');

const test = () => {
	console.log('test');

	setTimeout(foo, 0);

	new Promise((resolve, reject) => resolve('应该在 bar 之后、foo 之前')).then(
		(resolve) => console.log(resolve)
	);

	bar();
};

test();

/**
 * 结果
 *
 * test
 *
 * bar
 *
 * 应该在 bar 之后、foo 之前
 *
 * foo
 */

/**
 * setTimeout() 的回调函数会被放入到 “消息队列” 中
 * 需要等当前处理的调用堆栈全部执行完，才开始执行
 *
 * Promise 使用 “作业队列”
 * 在当前调用堆栈结束之前，执行 resolve 的函数
 * 因此会比 “消息队列” 早
 */

/**
 * process.nextTick()
 * 传入的函数在当前操作结束时、下一个事件循环滴答开始之前 调用
 */
process.nextTick(() => {});

/**
 * setImmediate()
 * 传入的函数在事件循环的下一个迭代中执行
 *
 * 延迟 0 毫秒的 setTimeout() 回调与 setImmediate() 相似
 * 执行顺序取决于各种因素，但都会在事件循环的下一个迭代中执行
 */
setImmediate(() => {});
