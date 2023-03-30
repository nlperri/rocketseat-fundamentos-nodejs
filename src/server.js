import http from 'node:http'
import { URL } from 'node:url'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-route-path.js'

// UUID => Unique Universal ID

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  //middlewares => interceptador

  await json(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
