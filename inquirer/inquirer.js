const inquirer = require('inquirer')
require('colors')

const menuOpts = [
    {
        type: 'list',
        name: 'options',
        message: 'Que desea hacer?',
        choices: [
            { value: 1, name: `${'1.'.green} Buscar ciudad` },
            { value: 2, name: `${'2.'.green} Historial` },
            { value: 0, name: `${'0.'.green} Salir \n` },
        ],
    },
]

const initialMenu = async () => {
    console.clear()
    console.log('======================='.green)
    console.log(' Seleccione una opcion'.green)
    console.log('=======================\n'.green)

    const { options } = await inquirer.prompt(menuOpts)
    return options
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: 'Presione enter para continuar',
        },
    ]

    console.log('\n')
    await inquirer.prompt(question)
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            },
        },
    ]

    const { desc } = await inquirer.prompt(question)
    return desc
}

const listadoLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, idx) => {
        return { value: lugar.id, name: `${idx + 1}. ${lugar.nombre}` }
    })

    const preguntas = [
        {
            type: 'list',
            name: 'lugarId',
            message: 'Seleccione el lugar correcto',
            choices,
        },
    ]

    const { lugarId } = await inquirer.prompt(preguntas)
    return lugarId
}

const listadoTareasChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, idx) => {
        return {
            value: tarea.id,
            name: `${idx + 1}. ${tarea.desc}`,
            checked: tarea.completadoEn ? true : false,
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione las tareas por completar',
            choices,
        },
    ]

    const { ids } = await inquirer.prompt(preguntas)
    return ids
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        },
    ]

    const { ok } = await inquirer.prompt(question)
    return ok
}

module.exports = {
    initialMenu,
    pausa,
    leerInput,
    listadoLugares,
    confirmar,
    listadoTareasChecklist,
}
