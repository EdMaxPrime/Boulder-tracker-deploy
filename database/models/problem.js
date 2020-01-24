const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define("problem",{
  index:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  grade:{
    type: Sequelize.STRING
  },
  name:{
    type: Sequelize.STRING
  },
  attempts:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sends:{
    type: Sequelize.INTEGER
  },
  comments:{
    type: Sequelize.STRING
  }
})

module.exports = Problem
