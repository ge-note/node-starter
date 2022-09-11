const fs = require('fs');
const path = require('path');

exports.saveUploadFile = (file) => {
  return new Promise((resolve, reject) => {
    // 读取文件
    fs.readFile(file.path, (err, fileData) => {
      if (err) reject(err);

      // 获取扩展名
      const extName = file.mimetype.split('/')[1];

      // 拼接新文件名
      const fileName = `${Date.now()}.${extName}`;

      // 写入文件
      fs.writeFile(
        path.join(__dirname, '../public/uploads', fileName),
        fileData,
        (err) => {
          if (err) reject(err);

          // 删除二进制文件
          fs.unlink(file.path, (err) => {
            if (err) reject(err);
          });

          // 验证是否存入
          fs.stat(
            path.join(__dirname, '../public/uploads', fileName),
            (err) => {
              if (err) reject(err);

              // 返回文件路径
              resolve(path.join('/uploads', fileName));
            }
          );
        }
      );
    });
  });
};
