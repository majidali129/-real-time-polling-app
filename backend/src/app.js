import express from 'express'

import pollsRoutes from '../src/routes/polls.routes.js'

export const app = express()


app.use(express.json())



// routes mounting
app.use('/api/v1/polls', pollsRoutes)