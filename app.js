const express = require('express')
const app = express()
const met = require('./met.js')

const port = process.env.PORT || 3000

app.get('/', function(req, res){
    res.send({
        ej1: 'Escribe la dirección /students/A01273884, para visualizar info de Luis Angeles',
        ej2: 'Esribe la dirección /met?search=sunflower',
        ej3: 'Esribe la dirección /met?search=goku para que constituents sea null',
        je4: 'Error cuando no se encuentra un search'
    })
})

app.get('/students/:id', function(req, res){
    if(req.params.id == 'A01273884')
        res.send({
            id: 'A01273884',
            fullname: 'Luis Alberto Angeles Morales',
            nickname: 'LA',
            age: 20
        })
    else{
        res.send({
            error: 'Matricula no coincide, intenta con A01273884',
            id: req.params.id,
            fullname: 'NO TENGO IDEA, MATRICULA NO VALIDA',
            nickname: 'EL EXTRAÑO',
            age: 'NA'
        })
    }
})

app.get('/met', function(req, res){
    if(!req.query.search){
        res.send({
            error: 'Envía el nombre de una obra o parecido'
        })
    }
    else{
        met.met(req.query.search, function(error, response){
            if(error){
                res.send({
                    error: error,
                    search: req.query.search
                })
            }
            else{
                met.metobjectID(response.ID, function(error, response){
                    if(error){
                        res.send({
                            error: error,
                        }) 
                    }
                    else{
                        res.send({
                            searchTerm: req.query.search,
                            artist : response.artist,
                            title: response.title,
                            year: response.year,
                            technique: response.technique,
                            metUrl: response.metUrl
                        })
                    }
                })
            }
        })
    }
})



app.get('*', function(req, res){
    res.send({
        error: 'Dirección no encontrada prueba con /'
    })
})


app.listen(port, function(){
    console.log('UP AND RUNNING!')
})