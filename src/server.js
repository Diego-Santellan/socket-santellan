const express = require('express');

// *** CONFIGURACION HANDLEBARS  ***//
const handlebars = require('express-handlebars')
const motor = handlebars;


const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const ArchiveContainer = require('../containers/archiveContainer.js');
const MemoryContainer = require('../containers/memoryContainer.js');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const apiProducts = new MemoryContainer();
const apiMenssages = new ArchiveContainer('mensajes.json');

io.on('connection', async socket =>{
    console.log('Nuevo cliente conectado!');
    
    socket.emit('productos', apiProducts.toListAll());

    socket.on('update', product => {
        apiProducts.save(product);
        io.sockets.emit('productos', apiProducts.toListAll());
    });

    socket.emit('mesajes', await apiMenssages.toListAll());

    socket.on('nuevoMensaje', async message =>{
        message.fyh = new Date().toLocaleString()
        await apiMenssages.save(message);
        io.sockets.emit('mensajes', await apiMenssages.toListAll());
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"))

app.engine(motor,handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", motor);


const PORT = 3000;

const server = httpServer.listen(PORT,() => {
    console.log(`Escuchando app en el puerto ${server.address().port}`);
});
 
server.on('error', error => console.log(`Error en servidor ${error}`))