/**
 * Buffer 内存区域，处理二进制数据
 */

/**
 * 创建 buffer
 */
const buf = Buffer.from('Hey!');

// 初始化固定大小

// const buf = Buffer.alloc(1024)

// const buf = Buffer.allocUnsafe(1024)

/**
 * 访问 buffer 内容
 */
console.log(buf[0]); // 72

console.log(buf[1]); // 101

console.log(buf[2]); // 121

// 以上数字是每个字符的 Unicode 码

// buffer 的全部内容
console.log(buf.toString()); // Hey!

// 迭代 buffer 的内容
for (const item of buf) {
  console.log(item); // 72, 101, 121, 33
}

// 获取 buffer 长度
console.log(buf.length); // 4

/**
 * 更改 buffer 内容
 */
buf.write('Buddy');

console.log(buf.toString()); // Budd
// 注意长度

// 修改指定位置
buf[1] = 111; // o
console.log(buf.toString()); // Bodd

/**
 * 复制 buffer
 */
const bufSource = Buffer.from('Hey!');

const bufCopy = Buffer.alloc(4);

// 默认复制整个 buffer
bufSource.copy(bufCopy);

console.log(bufCopy.toString()); // Hey!

// 可以指定位置和长度
const bufCopy2 = Buffer.alloc(2);

bufSource.copy(bufCopy2, 0, 0, 2);

console.log(bufCopy2.toString()); // He

/**
 * 切片 buffer
 *
 * 如果原始 buffer 改变，切片也是改变
 */
const bufSliceSource = Buffer.from('Hey!');

console.log(bufSliceSource.slice(0).toString()); // Hey!

const bufSlice = bufSliceSource.slice(0, 2);

console.log(bufSlice.toString()); // He

bufSliceSource[1] = 111; // o

console.log(bufSlice.toString()); // Ho
