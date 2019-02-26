var express = require('express');
var router = express.Router();
var sql = require('../db/db.js');
var config = require('../config/config.json');

const jwt = require('jsonwebtoken');

/* POST task by id. */
router.post('/:id/detail', function(req, res, next) { 
  try{
    if (req.body.token != '' && jwt.verify(req.body.token, config.app.secret_token_jwt).username == 'testuser' ) {
      sql.query("select id,task,status,created_at from tasks where id = ? ", req.params.id, function (err, resSQL) {             
          if(err) {
              console.log("error getTask : ", err);
              result(err, null);
          }
          else{
            console.log('res', resSQL);
            var result = {
              response_code: 200,
              success: true,
              message: 'retrieved data successfully',
              data: resSQL
            }
            res.status(200).json(result);
          }
        }
      );
    }  
  }catch(err){
      console.log('err : ', err);
      var result = {
          response_code: 401,
          success: false,
          message: 'invalid token'
        }
      res.status(401).json(result);
  }
});

/* POST all task list. */
router.post('/', function(req, res, next) {
  try{
    if (req.body.token != '' && jwt.verify(req.body.token, config.app.secret_token_jwt).username == 'testuser' ) {
      sql.query("select id,task,status,created_at from tasks ", function (err, resSQL) {             
        if(err) {
            console.log("error getTask : ", err);
            result(err, null);
        }
        else{
          console.log('res', resSQL);
          var result = {
            response_code: 200,
            success: true,
            message: 'retrieved data successfully',
            data: resSQL
          }
          res.status(200).json(result);
        }
      });
    }  
  }catch(err){
      console.log('err : ', err);
      var result = {
          response_code: 401,
          success: false,
          message: 'invalid token'
        }
      res.status(401).json(result);
  }      
});

/* POST create task. */
router.post('/create', function(req, res, next) { 
  try{
    if (req.body.token != '' && jwt.verify(req.body.token, config.app.secret_token_jwt).username == 'testuser' ) {
      sql.query("INSERT INTO tasks (task) values (?) ",req.body.task ,function (err, resSQL) {             
        if(err) {
            console.log("error createTask : ", err);
            result(err, null);
        }
        else{
          console.log('res', resSQL);
          var result = {
            response_code: 200,
            success: true,
            message: 'successfully create task'
          }
          res.status(200).json(result);
        }
      });
    }  
  }catch(err){
      console.log('err : ', err);
      var result = {
          response_code: 401,
          success: false,
          message: 'invalid token'
        }
      res.status(401).json(result);
  }      
});

/* POST update task by id. */
router.post('/:id/update', function(req, res, next) { 
  try{
    if (req.body.token != '' && jwt.verify(req.body.token, config.app.secret_token_jwt).username == 'testuser' ) {
      sql.query("UPDATE tasks SET task = ? WHERE id = ? ",[req.body.task, req.params.id] ,function (err, resSQL) {             
          if(err) {
              console.log("error updateTask : ", err);
              result(err, null);
          }
          else{
            console.log('res', resSQL);
            var result = {
              response_code: 200,
              success: true,
              message: 'successfully update task'
            }
            res.status(200).json(result);
          }
        }
      );
    }  
  }catch(err){
      console.log('err : ', err);
      var result = {
          response_code: 401,
          success: false,
          message: 'invalid token'
        }
      res.status(401).json(result);
  }      
});

/* POST delete task by id. */
router.delete('/:id', function(req, res, next) { 
  try{
    if (req.body.token != '' && jwt.verify(req.body.token, config.app.secret_token_jwt).username == 'testuser' ) {
      sql.query("DELETE FROM tasks WHERE id = ? ",[req.params.id] ,function (err, resSQL) {             
          if(err) {
              console.log("error deleteTask : ", err);
              result(err, null);
          }
          else{
            console.log('res', resSQL);
            var result = {
              response_code: 200,
              success: true,
              message: 'successfully delete task'
            }
            res.status(200).json(result);
          }
        }
      );
    }  
  }catch(err){
      console.log('err : ', err);
      var result = {
          response_code: 401,
          success: false,
          message: 'invalid token'
        }
      res.status(401).json(result);
  }      
});

module.exports = router;