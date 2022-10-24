import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { productsRouter } from './routes/products-router'
import { addressesRouter } from './routes/addresses-router'
import { NextFunction } from 'express-serve-static-core'
import { read } from 'fs'

// create express app
const app = express()
const port = process.env.PORT || 5000

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

// start app
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
