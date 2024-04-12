import { response, Router } from 'express'
// import { createReadStream } from 'node:fs'
// import { Readable, Transform } from 'node:stream'
// import { WritableStream, TransformStream } from 'node:stream/web'
import csvtojson from 'csvtojson'
// import { setTimeout } from 'node:timers/promises'

export default (router: Router): void => {
  router.get('/api/read-file', (req, res) => {
    let items: 0;
    let movies: any[] = []
    const abortController = new AbortController()
    res.once('close', _ => {
        console.log(`connection was closed!`, items)
        abortController.abort()
    })

    res.writeHead(200)
  })
}