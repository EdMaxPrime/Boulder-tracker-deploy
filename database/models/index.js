const User = require('./user')
const Session = require('./session')
const Problem = require('./problem')

User.hasMany(Session)
Session.belongsTo(User)

Session.hasMany(Problem)
Problem.belongsTo(Session)

module.exports = {
  User,
  Session,
  Problem
}
