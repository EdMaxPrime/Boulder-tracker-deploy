const express = require('express')
const router = express.Router()

const usersRouter = require('./users')
const sessionsRouter = require('./sessions')
const problemsRouter = require('./problems')
const graphRouter = require('./graph')

router.use('/users',usersRouter)
router.use('/sessions',sessionsRouter)
router.use('/problems',problemsRouter)
router.use('/graph',graphRouter)

// Error handling
router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
})

module.exports = router
