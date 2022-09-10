const joi = require('joi');

const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();
// dataUri() 指的是 base64 格式数据 uri
const avatar = joi.string().dataUri().required();

// 验证规则对象 - 更新用户信息
exports.updateUserInfoSchema = {
  body: {
    id,
    nickname,
    email,
  },
};

// 验证规则对象 - 重置密码
exports.updatePwdSchema = {
  body: {
    oldPwd: password,
    // join.ref('oldPwd) 表示 newPwd 的值和 oldPwd 的值相同
    // join.not(join.ref('oldPwd)) 表示 newPwd 的值不能和 oldPwd 的值相同
    // join.concat() 用于合并 join.not(join.ref('oldPwd)) 和 password 这两条规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
};

// 验证规则对象 - 更新头像
exports.updateAvatarSchema = {
  body: {
    avatar,
  },
};
