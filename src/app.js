const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { title } = require('process')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000


//configure the path for express->
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

// setup handlebar location and viewsPath->
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup dtatic directory to serve->
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Shivam Gupta"
    })
})
app.get('/about', (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Shivam Gupta"
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        helptext: "this is some helpful text",
        title: "Help Page",
        name: 'Shivam Gupta'
    })
})
app.get("/title", (req, res) => {
    res.send("Weather page")
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: "404 ",
        errormessage: "Help artcle not found",
        name: "Shivam Gupta"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "please provide address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errormessage: "page Not Found ",
        title: " 404 ",
        name: "Shivam Gupta"

    })
})


app.listen(port, () => {
    console.log("server is started on " + port)
})