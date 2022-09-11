const joi = require('joi');

const name = joi.string().required();
const alias = joi.string().alphanum().required();

exports.addCateSchema = {
  body: {
    name,
    alias,
  },
};
