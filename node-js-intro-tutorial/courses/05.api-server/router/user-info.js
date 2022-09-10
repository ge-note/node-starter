const express = require('express');
const expressJoi = require('@escook/express-joi');
const userInfoHandler = require('../router-handler/user-info');
const {
  updateUserInfoSchema,
  updatePwdSchema,
  updateAvatarSchema,
} = require('../schema/user-info');

const router = express.Router();

// 获取用户信息路由
router.get('/user-info', userInfoHandler.getUserInfo);

// 更新用户信息路由
router.post(
  '/user-info',
  expressJoi(updateUserInfoSchema),
  userInfoHandler.updateUserInfo
);

// 重置密码路由
router.post(
  '/update-pwd',
  expressJoi(updatePwdSchema),
  userInfoHandler.updatePwd
);

// 更新用户头像路由
router.post(
  '/update-avatar',
  expressJoi(updateAvatarSchema),
  userInfoHandler.updateAvatar
);

module.exports = router;
