/**
 * 流
 *
 * 以一种高效的方式处理读/写文件、网络通信、或任何类型的端到端信息交换
 *
 * 优点
 * 内存效率：无需加载大量的数据到内存中即可进行处理
 * 时间效率：当获得数据之后即可立即开始处理数据，这样所需的时间更少，而不必等到整个数据有效负载可用才开始
 */

/**
 * 从磁盘读取文件
 */
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream('./tmp/stream-file.tmp');

  // pipe() 获取来源流，并将其通过管道传输到目标流
  stream.pipe(res);
});
server.listen(3000);

/**
 * 创建可读流
 */
// 创建流对象
const Stream = require('stream');
const readableStream = new Stream.Readable();

// 实现 _read
readableStream._read = () => {};

// 或者
// const readableStream = new Stream.Readable({
//   read() {},
// });

// 向流发送数据
readableStream.push('Hi!');

readableStream.push('Ho!');

/**
 * 创建可写流
 */
const writableStream = new Stream.Writable();

// 实现 _write
writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString());
  next();
};

// 可以通过以下方式传输可读流
process.stdin.pipe(writableStream);

/**
 * 从可读流中获取数据
 */
// 使用可写流
readableStream.pipe(writableStream);

// 或者直接使用 readable 事件直接消费可读流
readableStream.on('readable', () => {
  console.log(readableStream.read());
});

/**
 * 发送数据到可写流
 */
writableStream.write('hey\n');

/**
 * 使用信号通知已结束写入的可写流
 */
writableStream.end();
