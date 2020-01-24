const Sequelize = require('sequelize')
const db = require('../db')

const Session = db.define("session",{
  date:{
    type: Sequelize.DATE,
    allowNull: false
  },
  location:{
    type: Sequelize.STRING,
  },
  comments:{
    type: Sequelize.STRING
  },
  numClimbs:{
    type:Sequelize.INTEGER
  }
})

module.exports = Session
