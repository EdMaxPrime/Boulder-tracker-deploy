const express = require('express')
const router = express.Router()
const {Problem} = require('../database/models')

router.post('/add', function(req, res, next){
  Problem.create({
    index:req.body.index,
    grade:req.body.grade,
    name:req.body.name,
    attempts:req.body.attempts,
    sends:req.body.sends,
    comments:req.body.comments,
    sessionId:req.body.sessionId
  })
    .then(obj => res.send(obj))
    .catch(err => res.send(err))
})

module.exports = router
