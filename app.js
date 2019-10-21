const express = require('express')
const app = express()
const met = require('./met.js')

const port = process.env.PORT || 3000

app.get('/', function(req, res){
    res.send({
        ej1: 'Escribe la dirección https://exam2-a01273884.herokuapp.com/students/A01273884, para visualizar info de Luis Angeles',
        ej2: 'Escribe la dirección https://exam2-a01273884.herokuapp.com/students/A01273334, para visualizar error de matricula no disp',
        ej3: 'Esribe la dirección https://exam2-a01273884.herokuapp.com/met?search=sunflower',
        ej4: 'Esribe la dirección https://exam2-a01273884.herokuapp.com/met?search=goku para que constituents sea null',
        je5: 'Error cuando no se encuentra un search https://exam2-a01273884.herokuapp.com/?search=sunflower389283923'
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
        error: 'Dirección no encontrada prueba con  https://exam2-a01273884.herokuapp.com/'
    })
})


app.listen(port, function(){
    console.log('UP AND RUNNING!')
})