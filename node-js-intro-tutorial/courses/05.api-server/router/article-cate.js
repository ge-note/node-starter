const express = require('express');
const articleCateHandler = require('../router-handler/article-cate');

const router = express.Router();

// 获取文章分类列表路由
router.get('/cates', articleCateHandler.getArticleCates);

module.exports = router;
