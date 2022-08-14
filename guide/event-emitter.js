/**
 * 事件触发器
 */
// 初始化事件触发器
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// 监听事件，添加事件回调函数
eventEmitter.on('start', (number) => {
  console.log('开始事件');
  console.log('接收的参数：', number);
});

// 触发事件
eventEmitter.emit('start', 100);

/**
 * 其他常用方法
 *
 * once() 添加单次监听器
 * removeListener() / off() 从事件中移除事件监听器
 * removeAllListeners() 移除事件的所有监听器
 */
