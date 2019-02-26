var express = require('express');
var router = express.Router();
var config = require('../config/config.json');

const jwt = require('jsonwebtoken');

/* POST users token. */
router.post('/token', function(req, res, next) {
	if (req.body.username == 'testuser' && req.body.password == 'testuser123!') {
		res.status(200).json({response_code: 200,
          success: true,
          message: 'successfully get token',
          token:jwt.sign({ username: req.body.username }, config.app.secret_token_jwt)});
	}else{
		var result = {
	      response_code: 2400,
	      success: true,
	      message: 'failed to get token',
	      token: null
        }
		res.status(400).json(result);
	}
	
});

module.exports = router;
