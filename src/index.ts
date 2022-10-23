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

const authGuardMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.query.token === '123') {
		next()
	} else {
		res.send(401)
	}
}

let requestCounter = 0

const requestCounterMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	requestCounter++
	next()
}

app.use(authGuardMiddleware)
app.use(requestCounterMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

// start app
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
