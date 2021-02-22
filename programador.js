/**
 * Tarea 1: Programador

La primera tarea que debe realizar el alumno es ampliar el programa de ejemplo añadiendo un programador que permita configurar la temperatura que se desea tener en la habitación en todo momento.

Debe crearse un fichero llamado programador.js que implemente un módulo que exporte una clase llamada Programador

El constructor de la clase Programador debe tomar como parámetro un objeto con la configuración de horas y temperaturas que se desea programar. El objeto con la configuración debe ser un array como el ilustrado a continuación.

[
  { hora: "07:00",
    temperatura: 22
  },
  { hora: "08:30",
    temperatura: 18
  },
  { hora: "18:00",
    temperatura: 22
  },
  { hora: "23:00",
    temperatura: 20
  }
]

Cada elemento del array es un objeto con dos claves: * hora: El valor asociado a esta clave es un string con la hora a la que debe aplicarse la programación de la nueva temperatura ideal. El formato de la hora debe ser "hh:mm". * temperatura: un número con la nueva temperatura ideal a programar.

Con la configuración del ejemplo se programaría una temperatura de 22ºC todos los días a las 7 de la mañana, 18ºC todos los días a las 8:30, 22ºC todas las tardes a las 6, y 20ºC todos los días a las 11 de la noche. Se recomienda usar el módulo Later.js (https://bunkat.github.io/later) para implementar el módulo programador.js. Recuerde instalarlo con `npm install. El módulo Later.js permite planificar instantes de tiempo en los que ejecutar tareas. Por ejemplo, para escribir por consola la palabra "hola" todos los días a las 18:00, se podría usar el siguiente código:

// Importar modulo Later.js:
const later = require('later');

// Usar zona horaria local:
later.date.localTime();

// Crear planificación para todos los dias a las 18:00
const sched = later.parse.text('at 18:00');

// Crear un temporizador que escriba indefinidamente "hola"
// en los instantes planificados anteriormente:
later.setInterval(() => console.log('hola'), sched);

Las instancias de la clase Programador deben emitir un evento llamado "ideal" cada vez que sea necesario reprogramar la temperatura ideal, siguiendo las instrucciones de la configuración pasada en el constructor. El evento "ideal" se emitirá pasando como parámetro el valor de la temperatura ideal a programar en el termostato.

Para poder emitir eventos, la clase Programador debe extender a la clase EventEmitter.

Finalmente, en el programa principal main.js deben añadirse los siguientes cambios: * Importar el módulo programador.js para crear un objeto Programador. * Añadir las sentencias necesarias para que cuando el programador emita un evento "ideal", se ajuste la nueva temperatura ideal en el termostato.
 */

//const EventEmitter = require('events');
const EventEmitter = require('./events'); // Tarea 2

// Importar modulo Later.js:
const later = require('later');

// Clase Programador
class Programador extends EventEmitter {
    constructor(configuracion) {
        super();

        // set later to use local time
        later.date.localTime();

        configuracion.forEach((programa, i) => {
            later.setInterval(() => {
                this.emit('ideal', programa.temperatura);
                console.log(`Programa nº ${i}: Modificando temperatura ideal a ${programa.temperatura} ºC`);
            }, later.parse.text(`at ${programa.hora}`));
        });
    }
}

exports = module.exports = Programador;