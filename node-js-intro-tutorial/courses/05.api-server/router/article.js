const express = require('express');
const expressJoi = require('@escook/express-joi');
const articleHandler = require('../router-handler/article');
const {
  addArticleSchema,
  getArticleSchema,
  deleteArticleSchema,
  updateArticleSchema,
} = require('../schema/article');

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

// 获取文章列表路由
router.get('/list', articleHandler.getArticles);

// 根据 id 获取文章详情路由
router.get('/:id', expressJoi(getArticleSchema), articleHandler.getArticleById);

// 根据 id 删除文章
router.get(
  '/delete/:id',
  expressJoi(deleteArticleSchema),
  articleHandler.deleteArticleById
);

// 更新文章
router.post(
  '/update',
  upload.single('cover_img'),
  expressJoi(updateArticleSchema),
  articleHandler.updateArticle
);

module.exports = router;
