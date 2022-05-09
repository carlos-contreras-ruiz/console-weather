const axios = require('axios')

const axiosInstance = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    timeout: 3000,
})

const axiosOpenWheather = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
    timeout: 3000,
})

module.exports = {
    axiosInstance,
    axiosOpenWheather,
}
