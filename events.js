/**
 * Tarea 2: Events

En esta tarea se pide al alumno que cree su propia implementación del módulo events, y que la integre en el programa de ejemplo, sustituyendo al módulo events proporcionado por Node.js.

La implementación pedida al alumno es una versión reducida de la proporcionada por Node.js. El alumno solo debe implementar los métodos emit y on.

Para que el módulo implementado por el alumno se integre fácilmente en el programa de ejemplo, deben cumplirse los siguientes requisitos:

    El módulo debe llamarse events.js y situarse junto a los demás ficheros javascripts.
    Para requerirlo desde termostato.js y desde programador.js deberá sustituir las llamadas require("events") por require("./events").
    El módulo debe exportar una clase que se llame EventEmitter.
    - Las instancias de EventEmitter deben tener una propiedad donde se deben guardar todos los escuchadores que se hayan registrado usando el método on. Esta propiedad debe ser un objeto ({}) en el que la clave sea el nombre de cada evento y el valor la lista de escuchadores interesados en cada evento. Ejemplo: { "ideal": [ Function, Function, Function ], "otro_evento": [ Function, Function ] }
    - Las instancias de EventEmitter deben tener el método on, para que los escuchadores se registren. Este método toma como parámetro el nombre de un evento, y el método a ejecutar cuando se emita ese evento.
    - Las instancias de EventEmitter deben tener el método emit, que se emplea para emitir un evento. Este método toma como parámetros el nombre del evento a emitir, y los argumentos que hay que pasar a las funciones escuchadoras interesadas en ese evento.

Una vez sustituido el módulo events de Node.js por el desarrollado por el alumno, el comportamiento del programa de prueba no debe variar.
 */

// Clase EventEmitter
class EventEmitter {
    listeners = {}; // Objeto que contendrá todos los eventos y su lista de callbacks

    on(event, callback) { // Asocia el evento event a uno o más de sus callback
        if (!Array.isArray(this.listeners[event])) {
            this.listeners[event] = []; // Crea el evento
            console.log(`EventEmitter::on creando: event(${event}) -> tiene ${Object.keys(this.listeners).length} eventos`);
        }
        this.listeners[event].push(callback); // Asocia al callback al evento event
        console.log(`EventEmitter::on insertando: event->${event} callback->${callback} tiene ${this.listeners[event].length} callbacks`);
    }

    emit(event, args) {
        this.listeners[event].forEach((callback) => { // Recorre todo el array de callbacks
            console.log(`EventEmitter::emit invocando: ${callback}(${args})`);
            callback(args); // Invoca a todos los callbacks del evento con sus parámetros
        });
    }
}

exports = module.exports = EventEmitter;