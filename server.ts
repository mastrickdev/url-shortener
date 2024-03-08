import express from "express"
import mongoose from "mongoose"
import shortURLData from "./models/shortURL"

const app = express()
mongoose.connect('mongodb+srv://marcoantonioaraujo:D7u5EFHDh6aY970c@url-shortener.hoqmnvn.mongodb.net/?retryWrites=true&w=majority&appName=url-shortener')

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.get('/', async (request, response) => {
    const shortURLs = await shortURLData.find()

    response.render('index', { shortURLs: shortURLs })
})

app.get('/:shortURL', async (request, response) => {

    const shortURL = await shortURLData.findOne({ short: request.params.shortURL })
    if (!shortURL) return response.sendStatus(404)

    shortURL.clicks++
    shortURL.save()

    response.redirect(shortURL.full)
})

app.post('/shortURLs', async (request, response) => {
    const body = request.body

    await shortURLData.create({ full: body.fullURL, short: body.shortenedURL })
    response.redirect('/')
})

app.listen(process.env.PORT || 5000)