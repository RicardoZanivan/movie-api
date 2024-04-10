import { response, Router } from 'express'
import { createReadStream } from 'node:fs'
import { Readable, Transform } from 'node:stream'
import { WritableStream, TransformStream } from 'node:stream/web'
import csvtojson from 'csvtojson'
import { setTimeout } from 'node:timers/promises'

export default (router: Router): void => {
  router.get('/api/read-file', (req, res) => {
    let items: 0;
    let movies: any[] = []
    const abortController = new AbortController()
    res.once('close', _ => {
        console.log(`connection was closed!`, items)
        abortController.abort()
    })

    Readable.toWeb(createReadStream('./public/movielist.csv'))
        .pipeThrough(Transform.toWeb(csvtojson()))
        .pipeThrough(new TransformStream({
        transform(chunk, controller) {
            const data = JSON.parse(Buffer.from(chunk) as any)
            console.log('=== data ===', data)
            const mappedData = {
            title: data.title,
            description: data.description,
            url_anime: data.url_anime
            }
            console.log('=== mappedData ===', mappedData)
            // quebra de linha pois é um NDJSON
            controller.enqueue(JSON.stringify(mappedData).concat('\n'))
        }
        }))
      // pipeTo é a ultima etapa
        .pipeTo(new WritableStream({
            async write(chunk) {
            await setTimeout(200)
            items++
            res.write(chunk)
            },
            close() {
            res.end()
            }

        }), {
            signal: abortController.signal
        })

      res.writeHead(200)
  })
}