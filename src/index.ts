import server from './server/server'

const PORT = process.env.PORT || 4000

server.listen(PORT, () => console.info(`***Listening on port ${PORT}***`))
