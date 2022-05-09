const {
    leerInput,
    initialMenu,
    pausa,
    listadoLugares,
} = require('./inquirer/inquirer')
const BusquedaService = require('./services/busquedaService')
require('colors')
require('dotenv').config()

const main = async () => {
    let option = 0

    const busquedaService = new BusquedaService()

    do {
        option = await initialMenu()

        switch (option) {
            case 1:
                const searchTerm = await leerInput('Ciudad a buscar: ')
                const lugares = await busquedaService.ciudad(searchTerm)
                const idLugarSelected = await listadoLugares(lugares)
                const lugarSelected = lugares.find(
                    (lugar) => lugar.id == idLugarSelected
                )

                const { tmp, min, max, desc } = await busquedaService.clima(
                    lugarSelected.lat,
                    lugarSelected.lng
                )
                console.log('\nInformacion de la ciudad\n'.green)
                console.log('Ciudad: ', lugarSelected.nombre)
                console.log('Description: ', desc)
                console.log('Lat: ', lugarSelected.lat)
                console.log('Lng: ', lugarSelected.lng)
                console.log('Temperatura: ', tmp)
                console.log('Min: ', min)
                console.log('Max: ', max)
                break
            case 2:
                break
            case 0:
                break
            default:
                option = 0
                break
        }

        if (option !== 0) await pausa()
    } while (option !== 0)

    await pausa()
}

main()
