import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {
  readRecords,
  insertRecord,
  deleteRecord,
} from './src/utils/records.mjs'

const PORT = 5000
const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: '*' }
})

app.use(bodyParser.json())
app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello from the time saving service!')
})

app.get('/times', async (_, res) => {
  res.send(await readRecords())
})

app.post('/times', async (req, res) => {
  const result = await insertRecord(req.body.time)
  res.send(result)
  
  io.emit('time_added', { id: result.insertId, time: req.body.time })
})

app.delete('/time/:id', async (req, res) => {
  const result = await deleteRecord(req.params.id)
  res.send(result)
  
  io.emit('time_deleted', req.params.id)
})

httpServer.listen(PORT, () => {
  console.log(`Express web server is running at http://localhost:${PORT}`)
})