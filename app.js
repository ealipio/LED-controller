(function(){

'use strict';

  angular.module('EissonApp', [])
  .controller('piController',['$scope','$http', '$timeout', 'socket', function ($scope,$http, $timeout, socket) {
    $scope.messages = {
      off:'Apagala!',
      on:'Enciende la luz',
      icon:{on:'fa fa-lightbulb-o', off:'fa fa-power-off'},
      btn: 'btn btn-block btn-lg'};
    //$scope.lightOn = false;
    //$scope.disabled = false;

    socket.on('init', function (response) {
      $scope.lightOn = response.message;
      $scope.disabled = false;
    });
    socket.on('messageToClient', function (response) {
      $scope.lightOn = response.message;
      $scope.disabled = false;
    });

    $scope.powerOn = function() {
      $scope.lightOn = true;
      $scope.disabled = true;
      $scope.sendMessage();
    };

    $scope.powerOff = function() {
      $scope.lightOn = false;
      $scope.disabled = true;
      $scope.sendMessage();
    };

    $scope.sendMessage = function () {
      socket.emit('messageFromClient', { ledStatus: $scope.lightOn });
    };

  }])
  .factory('socket', function ($rootScope) {
    var connection = 'ws://10.10.10.11:3000/';
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