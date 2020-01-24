const {User, Session, Problem} = require("../database/models")

const syncTables = async () => {
  await User.sync({force:true})
  await Session.sync({force:true})
  await Problem.sync({force:true})
}

const users = require('../data/users')
const sessions = require('../data/sessions')
const problems = require('../data/problems')

const populateUsersTable = async (users) => {
  for(let i = 0; i < users.length; i++){
    let currentUser = await User.create(users[i])
  }
}

const populateSessionTable = async (sessions) => {
  for(let i = 0; i < users.length; i++){
    let currentSession = await Session.create(sessions[i])
    currentSession.userId = 1
    await currentSession.save()
  }
}

const populateProblemTable = async (problems) => {
  for(let i = 0; i < problems.length; i++){
    let currentProblem = await Problem.create(problems[i])
    currentProblem.sessionId = 1
    await currentProblem.save()
  }
}

const seedDatabase = async () => {
  try {
    await syncTables();
    await populateUsersTable(users);
    await populateSessionTable(sessions);
    await populateProblemTable(problems);
    console.log("Successfully seeded!");
    process.exit(0);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedDatabase()
