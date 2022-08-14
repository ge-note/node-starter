/**
 * 操作系统
 */
const os = require('os');

// 返回标识底层架构的字符串
console.log(os.arch()); // arm64

// 返回系统 CPU 信息
console.log(os.cpus());

// 返回当前使用 大端序 或 小端序 编译 Node.js
console.log(os.endianness()); // LE

// 返回系统中可用内存字节数
console.log(os.freemem());

// 返回当前用户的主目录路径
console.log(os.homedir());

// 返回主机名
console.log(os.hostname());

// 返回 Node.js 编译的平台
console.log(os.platform()); // darwin

// 标识操作系统
console.log(os.type()); // Darwin
// ...
