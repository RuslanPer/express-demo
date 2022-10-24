import { Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware'
import { productsRepository } from '../repositories/products-repository'

export const productsRouter = Router({})

const titleValidation = body('title')
	.trim()
	.isLength({ min: 3, max: 30 })
	.withMessage('Title length should be from 3 to 30 symbols')

productsRouter.get('/', (req: Request, res: Response) => {
	const foundProducts = productsRepository.findProducts(
		req.query.title?.toString()
	)
	res.send(foundProducts)
})

productsRouter.post(
	'/',
	titleValidation,
	inputValidationMiddleware,
	(req: Request, res: Response) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const newProduct = productsRepository.createProduct(req.body.title)
		res.status(201).send(newProduct)
	}
)

productsRouter.get('/:id', (req: Request, res: Response) => {
	const product = productsRepository.findProductById(+req.params.id)
	if (product) {
		res.send(product)
	} else {
		res.send(404)
	}
})

productsRouter.put(
	'/:id',
	titleValidation,
	inputValidationMiddleware,
	(req: Request, res: Response) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const isUpdated = productsRepository.updateProduct(
			+req.params.id,
			req.body.title
		)
		if (isUpdated) {
			const product = productsRepository.findProductById(+req.params.id)
			res.send(product)
		} else {
			res.send(404)
		}
	}
)

productsRouter.delete('/:id', (req: Request, res: Response) => {
	const isDeleted = productsRepository.deleteProduct(+req.params.id)
	if (isDeleted) {
		res.send(204)
	} else {
		res.send(404)
	}
})
