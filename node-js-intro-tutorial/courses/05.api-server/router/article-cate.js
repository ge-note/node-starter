const express = require('express');
const expressJoi = require('@escook/express-joi');
const articleCateHandler = require('../router-handler/article-cate');
const { addCateSchema, deleteCateSchema } = require('../schema/article-cate');

const router = express.Router();

// 获取文章分类列表路由
router.get('/cates', articleCateHandler.getArticleCates);

// 新增文章分类路由
router.post(
  '/add-cate',
  expressJoi(addCateSchema),
  articleCateHandler.addArticleCate
);

// 根据 id 删除文章分类路由
router.get(
  '/delete-cate/:id',
  expressJoi(deleteCateSchema),
  articleCateHandler.deleteArticleCateById
);

module.exports = router;
