var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoJs = require('mongojs');
var db = mongoJs('parkAR',['parkAR']);
//var mongoose = require('mongoose');
//var Schema = mongoose.schema();
var path=require('path');

/*
// Conecto a la base de datos
mongoose.connect('mongodb://localhost/parAR');


var parkingSchema = new Schema({
  id: Number,
  name: String,
  address : String,
  district: String,
  telephone: String,
  floors: int
});

var Parking = mongoose.model('Parking','parkingSchema');
module.exports = Parking;
/*



/*var messageLogOk = function (req, res, next){
    console.log(Date.now() + " Server UP!");
    next();
}*/
//app.use(messageLogOk);


app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/parkings',function(req,res){
    
    console.log("/parkings recibi un request");
    db.parkAR.find(function(err,docs){
        console.log(docs);
        res.json(docs);
      
    });
  
app.get('/parkings/:id',function(req,res){
  
    var id = req.params.id;
    console.log("SERVER, RECIBI PARA EL EDIT: " + id);
    db.parkAR.findOne({_id: mongoJs.ObjectId(id)}, function (err,doc){
        res.json(doc);
    });
  
});  
  
app.post('/parkings',function(req,res){
    //console.log(req.body);
    db.parkAR.insert(req.body, function(err,doc){
      res.json(doc);
    });
  
});
  
app.put('/parkings/:id', function(req, res){
    var id= req.params.id;
    console.log(req.body.name);
    db.parkAR.findAndModify({query:  {_id: mongoJs.ObjectId(id)},
        update: {$set: {id: req.body.id,name: req.body.name, address: req.body.address, district: req.body.district,
                        telephone: req.body.telephone, floors: req.body.floors}}, 
                            new: true}, function (err,doc){
                              res.json(doc);
                           
    });
  
});
  
app.delete('/parkings/:id',function(req,res){
    var id = req.params.id;
    db.parkAR.remove({_id:mongoJs.ObjectId(id)}, function (err,doc){
      res.json(doc);
    });
    console.log("ID PASADO POR PARMETRO" + id);
  
}); 
  /*
  // Collecion de estacionamientos
var parkings = [
    {id:1, name:'Palermo Parking', address:'Mario Bravo 1000', floors:2 },
    {id:2, name:'Recoleta Parking', address:'Av. Santa Fe 2000', floors:1 },
    {id:3, name:'Caballito Parking', address:'Av. Rivadavia 5000', floors:1 }
];

// Coleccion de Pisos
var floors = [
    {pId:1, fId:1, places:20, booked:[0,1,2,9,10] },
    {pId:1, fId:2, places:15, booked:[8,12,14] },
    {pId:2, fId:1, places:10, booked:[] },
    {pId:3, fId:1, places:10, booked:[3,5] }
];

// Colleccion de Clientes
var users = [ 
    {uid: 0, name: 'Lucas', booked: [ {p:1, f:1, b:[0]}, // p: parking id - f: floor id - b: booked places
                                {p:1, f:2, b:[8]}, {p:3, f:1, b:[3,5]}  ]},
    {uid: 1, name: 'Octavio', booked: [ {p:1, f:1, b:[1,2,9]}, {p:1, f:2, b:[12,14]} ]},
    {uid: 2, name: 'Diego', booked: [ {p:1, f:1, b:[10]} ]}
];
   res.json(parkings);
   
*/
});

/*
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
*/

app.listen(8080,function(){
    console.log("Server listening on por 8080")
});
