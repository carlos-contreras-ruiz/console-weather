const { axiosInstance, axiosOpenWheather } = require('../config/axiosConfig')

class BusquedaService {
    async ciudad(ciudad) {
        try {
            const resp = await axiosInstance.get(`/${ciudad}.json`, {
                params: {
                    access_token: process.env.MAPBOX_KEY,
                    limit: 5,
                    language: 'es',
                },
            })
            return resp.data.features.map((item) => {
                return {
                    id: item.id,
                    nombre: item.place_name,
                    lng: item.center[0],
                    lat: item.center[1],
                }
            })
        } catch (error) {
            console.log(error.message)
            return []
        }
    }

    async clima(lat, lng) {
        try {
            const resp = await axiosOpenWheather.get('', {
                params: {
                    lat,
                    lon: lng,
                    appid: process.env.OPEN_KEY,
                    units: 'metric',
                    lang: 'es',
                },
            })
            return {
                desc: resp.data.weather[0].description,
                tmp: resp.data.main.temp,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
            }
        } catch (error) {
            console.log(error.message)
            return {}
        }
    }
}

module.exports = BusquedaService
