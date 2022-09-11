const express = require('express');
const expressJoi = require('@escook/express-joi');
const articleCateHandler = require('../router-handler/article-cate');
const { addCateSchema } = require('../schema/article');

const router = express.Router();

// 获取文章分类列表路由
router.get('/cates', articleCateHandler.getArticleCates);

// 新增文章分类路由
router.post(
  '/add-cate',
  expressJoi(addCateSchema),
  articleCateHandler.addArticleCate
);

module.exports = router;
