const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=1fec8348c8bc95411b93613c7e389c1c&query=" + latitude + "," + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) { callback("Sorry!Check your Network Connection") }
        else if (body.error) { callback("Kindly Input another location") }
        else {

            callback(undefined, body.current.weather_descriptions + ". it is " + body.current.temperature + " degree outside. But feels like " + body.current.feelslike + " degree.The wind speed is " + body.current.wind_speed + " . Humidity is " + body.current.humidity + "%")

        }
    })

}
module.exports = forecast