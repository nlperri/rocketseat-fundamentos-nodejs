//Streams

//process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundrerStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 1000)
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

//chunk => o que está sendo enviado (push) na stream de leitura
//encoding => como a informação está codificada
//callback => primeiro parâmetro: erro // segundo parâmetro: dado transformado

new OneToHundrerStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
