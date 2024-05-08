require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const errorMiddleware = require('./middlewares/err-middleware')
const userRouter = require('./routers/user-router')

const PORT = process.env.PORT || 6500
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: '*',
		credentials: true
	})
)
app.use(errorMiddleware)

app.use('/api', userRouter)

app.get('/', (req, res) => {
	const { name = 'world' } = req.query
	res.json({
		msg: `hello ${name}`
	})
})

app.get('/hi', (req, res) => {
	res.sendFile(__dirname + '/welcome/welcome.html')
})

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start().then(r => r)

// module.exports = app
