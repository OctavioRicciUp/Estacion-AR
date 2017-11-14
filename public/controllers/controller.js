var ParkAr=angular.module('ParkAr',[]);

ParkAr.controller('controllerParkAr',function($scope,$http){
    console.log("HOLA SOY EL CONTROLLER DE ANGULAR");  
  
  // Con refresh me aseguro que cada vez que inserto un dato, automáticamente actualiza la página
  var refresh = function(){
      $http.get('/parkings')
        .then(function(res){
              console.log("Controller de vista: recibí la respuesta");
              $scope.parkings = res.data;
              $scope.park = null; // Borra los datos del input
              //console.log($scope.parkings);
      });
 };
 refresh();

  
  $scope.addParking = function(){
    console.log($scope.park);
    $http.post('/parkings',$scope.park) // Envío lo que escribí en el textbox al server para que se guarde en el app,post('/parkings')
      .then(function(res){
        console.log(res);
        refresh();
    });
  };
  
  $scope.editParking = function(id){
    console.log(id);
    $http.get('/parkings/' + id)
      .then(function(res){    // Acá recibo el parking que mande a editar al server para finalmente editarlo
          $scope.park = res.data;
    })
        
  };
 
  $scope.updateParking = function(){
    console.log("Habilitado para update: "+ $scope.park._id);
    $http.put('/parkings/' + $scope.park._id, $scope.park) 
      .then(function(res){
          refresh();
      });
  };
  
  $scope.removeParking = function(id){
    console.log(id);
    $http.delete('/parkings/' + id)
      .then(function(res){
        refresh();
    });
  };
  
    
});

// INSERT
// Una vez completado en los input del browser, al clickear el botón INSERT, se llama a la función inserParking()
// No se necesita pasar por parámetro ningún id, ya que la función, tomará los datos de $scope.park
// Estos datos los envía al endpoint de NodeJS post('/parkings/), que tampoco es necesario enviar ningún id por parámetro
// Ya dentro del endpoint post('/parking'), hace un insert con lo enviado por  $scope.park


// MODIFICACION
// Primero clickeamos en edit, el cual llama a la funciín editParking(id) del controller de la vista
// La funcion editParking(id) toma el id seleccionado y lo envía al endpoint de NodeJS get('/parkings/id)
// el endpoint get('/parkings/:id'), con el id pasado, lo utiliza para buscar en la base de datos mongo y devolver al controller de la vista
// toda la info de ese id
// el controller de la vista editParking, con los datos devueltos del parking, rellena los campos del input en el browser
// Ya con los datos en los input, al clickear en UPDATE, se llama a la función del controller de la vista updateParking, el cual,no necesita que le pasen
// por parámetro un id, ya que los toma de los campos del input $scope.park
// envia los datos al endpoint put('/parkings/':id)
// Envía $scope.park._id , que será el dato necesario para que busque inequívocamente en la base de datos el registro.
// Luego, con el segundo argumento enviado desde el controller $scope.park, que será lo que tome como datos para hacer el update en ese registro

