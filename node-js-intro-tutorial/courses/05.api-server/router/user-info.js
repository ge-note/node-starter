const express = require('express');
const userInfoHandler = require('../router-handler/user-info');

const router = express.Router();

router.get('/user-info', userInfoHandler.getUserInfo);

module.exports = router;
