(function(){

'use strict';

  angular.module('EissonApp', [])
  .controller('piController',['$scope','$http', '$timeout', 'socket', function ($scope,$http, $timeout, socket) {
    $scope.messages = {
      off:'Apagala!',
      on:'Enciende la luz',
      icon:{on:'fa fa-lightbulb-o', off:'fa fa-power-off'},
      btn: 'btn btn-block btn-lg'};
    $scope.lightOn = false;
    $scope.disabled = false;

    socket.on('init', function (data) {
      console.log(data);
    });

    $scope.turnOn = function() {
      console.log('prendiendo');
      $scope.disabled = true;
      $scope.lightOn = true;
      $timeout(function(){$scope.disabled = false;},1000);
      //$scope.inServer('on');
    };

    $scope.turnOff = function() {
      console.log('apagando');
      $scope.lightOn = false;
      $scope.disabled = true;
      $timeout(function(){$scope.disabled = false;},1000);
      //$scope.inServer('off');
    };

    $scope.inServer = function(action) {
      var data = {action: action};
        $http({method:'POST',url: 'api/server.php', data:$.param(data), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
          console.log( response );
      }).error(function(data, status){ });
    };
  }])
  .factory('socket', function ($rootScope) {
    var connection = 'ws://10.10.10.9:3000/';
    var socket = io.connect(connection);
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  });

})();