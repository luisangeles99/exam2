process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
const request = require ('request')



const met = function(search, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + search 
    request({ url, json: true}, function(error, response){
        if(error){
            ERR = {
                error: 'Posible problema de conexión o con el host destino'
            }
            callback(ERR, undefined)
        }
        if(response.body.total == 0){
            notfound = {
                error : 'Try with another query search :), no results found'
            }
            callback(notfound, undefined)
        }
        else{
            const data = {
                ID: response.body.objectIDs[0]
            }
            callback(undefined, data)
        }
    })
}

const metobjectID = function(id, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id
    request ({ url, json:true}, function(error, response){
        if(error){
            ERR = {
                error: 'Posible problema de conexión o con el host destino'
            }
            callback(ERR, undefined)
        }
        else{
            if(response.body.constituents==null){
                info = {
                    artist : 'Not available',
                    title: response.body.title,
                    year: response.body.objectEndDate,
                    technique: response.body.medium,
                    metUrl: response.body.objectURL
                }
            }
            else{
                info = {
                    artist : response.body.constituents[0].name,
                    title: response.body.title,
                    year: response.body.objectEndDate,
                    technique: response.body.medium,
                    metUrl: response.body.objectURL
                }
            }
            callback(undefined, info)
        }
    })
}

module.exports = {
    met: met,
    metobjectID: metobjectID
}