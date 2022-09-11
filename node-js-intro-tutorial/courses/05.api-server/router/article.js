const express = require('express');
const expressJoi = require('@escook/express-joi');
const articleHandler = require('../router-handler/article');
const { addArticleSchema } = require('../schema/article');

// 解析 multipart/form-data 数据
const multer = require('multer');
const path = require('path');
// 指定文件的存放路径
const upload = multer({
  dest: path.join(__dirname, '../public/uploads/'),
});

const router = express.Router();

// 新增文章路由
router.post(
  '/add',
  upload.single('cover_img'),
  expressJoi(addArticleSchema),
  articleHandler.addArticle
);

module.exports = router;
