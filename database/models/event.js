const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define("event",{
  ics:{
    type: Sequelize.STRING
  },
  name:{
    type: Sequelize.STRING
  },
  date:{
    type: Sequelize.DATE,
    allowNull: false
  },
  location:{
    type: Sequelize.INTEGER
  },
  description:{
    type: Sequelize.STRING
  }
})

module.exports = Event
