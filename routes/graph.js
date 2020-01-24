const express = require('express')
const router = express.Router()
const {Session, Problem} = require('../database/models')

router.get('/', function(req, res, next){
  let out = []
  for(let i = 0; i < 10; i++){
    out.push({model_name:"V"+i, field1:0, field2:0})
  }
  Session.findAll({where:{userId:req.user.id},include:[Problem]})
    .then(sessions => {
      for(let i = 0; i < sessions.length; i++){
        problems = sessions[i].problems
        for(let j = 0; j < problems.length; j++){
          let grade = problems[j].grade.slice(1)
          let sends = problems[j].sends
          let attempts = problems[j].attempts
          if(sends){
            out[grade].field1 += problems[j].sends
          }
          if(attempts){
            out[grade].field2 += problems[j].attempts
          }
        }
      }
      return res.json(out)
    })
    .catch(err => res.status(404))
})

module.exports = router
