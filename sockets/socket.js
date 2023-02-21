const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('shakira'));
bands.addBand( new Band('hash'));
bands.addBand( new Band('5secondofsummer'));
bands.addBand( new Band('miley'));
//console.log(bands);

// Mensajes de Socket
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => { console.log('Cliente desconectado')});

    client.on('mensaje',(payload )=> {
        console.log('Mensaje',payload);
       
        io.emit('mensaje', {
            admin: 'Nuevo mensaje ¿'
        });
    });

    //prueba
    client.on('emitir-mensaje',(payload)=>{
       // console.log(payload);//para saber si estaba emitiendo
       // io.emit('nuevo-mensaje', payload);//emite a todos lo clientes
       //emite a todos menos al qeu lo emite
      client.broadcast.emit('nuevo-mensaje', payload);
    });
    //para escuchar los votos
    client.on('vote-band',(payload)=>{
        //console.log(payload);
        bands.voteBand(payload.id);
       io.emit('active-bands', bands.getBands());
    });
    //ecucchar add-band recibiremos el payload
    client.on('add-band', (payload)=>{        
        const newBand = new Band( payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band',(payload)=>{
        //console.log(payload);
        bands.deleteBand(payload.id);
       io.emit('active-bands', bands.getBands());
    });


  });
