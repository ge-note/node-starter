const joi = require('joi');

const id = joi.number().integer().min(1).required();
const title = joi.string().required();
const content = joi.string().required().allow('');
const state = joi.string().valid('已发布', '草稿').required();
const cate_id = joi.number().integer().min(1).required();

exports.addArticleSchema = {
  body: {
    title,
    content,
    state,
    cate_id,
  },
};

exports.getArticleSchema = {
  params: {
    id,
  },
};
