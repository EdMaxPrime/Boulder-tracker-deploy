const express = require('express')
const router = express.Router()
const {Event} = require('../database/models')

router.post('/add', function(req, res, next){
  console.log("isAuthenticated: ", req.isAuthenticated());
  var config = Object.assign({}, {
    ics: "",
    name: "Untitled",
    date: new Date(),
    location: "",
    description: "",
    hostId: req.user.id
  }, req.body);
  Event.create(config)
  .then(obj => res.send(obj))
  .catch(err => res.send(err, 500))
})

router.get("/:id", function(req, res, next) {
  Event.findByPk(req.params.id)
  .then(event => res.send(event))
  .catch(err => res.status(404))
})

module.exports = router
