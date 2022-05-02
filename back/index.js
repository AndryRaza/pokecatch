import express, { json } from "express";

import pokemonRouter from "./routes/pokemon.js"
import swaggerRouter from "./routes/swagger.js"

import sqlite3 from "sqlite3";


var app = express();
var sqlite3_ = sqlite3.verbose();

const db = new sqlite3.Database('trainers.db')

db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS trainers (id TEXT, pseudo TEXT)')
     db.all('SELECT ID, PSEUDO FROM trainers', function (err, row) {
       if (err) {
         console.log(err)
       } else {
       if (row.length === 0) {
         var stmt=db.prepare('INSERT INTO trainers VALUES (?, ?)')
         var obj= [{ id:'1', pseudo:'Yrdna' }]
         for (var i in obj) {
            stmt.run(obj[i].id, obj[i].pseudo)
         }
         stmt.finalize()
         } else {
          console.log('Database already exists')
         }
       }
    })
  })

app.use(json());
app.set('port',3000)
app.listen(app.get('port'))
console.log('Server listening on port', app.get('port'))

app.use('/test',function(request,response){
    response.send('yo')
})

app.use('/api',swaggerRouter)


app.use('/api/pokemon',pokemonRouter);

