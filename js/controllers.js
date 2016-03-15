'use strict';

/* Controllers */

var viewpanelControllers = angular.module('viewpanelApp.controllers', []);

viewpanelControllers.controller('ViewpanelController', ['$scope', '$window', 'SerialPortService', 
  function ($scope, $window, SerialPortService) {    
    $scope.connected = false;
    $scope.selectedRadio = "A";
    var error = function (title, message, type) {
      swal({
        title: title,
        text: message, 
        type: type,
        allowEscapeKey: true,
        allowOutsideClick: true
      });
    }
    
    SerialPortService.list().then(function (ports) {
      $scope.$apply(function() {
        $scope.ports = ports;
      });
    });

    $scope.connect = function() {
      /*
      - tutta questa logica dovrà essere spostata nel service
      - capire se gestire gli errori con alert o flash
      - capire come passare gli errori dal service a questo controller
      */
      console.log("Scope.selectedPort:", $scope.selectedPort)
      if ($scope.selectedPort) {
        if (SerialPortService.isOpen) {
          //$window.alert("Attenzione, porta occupata");
          error("Warning", "Attenzione, porta occupata", "warning");
        } else {
          if (($scope.selectedPort.length === 0) || ($scope.selectedPort.port == "")) {
            console.log("Errore con la porta selezionata");
          } else {
            SerialPortService.open($scope.selectedPort);
            $scope.connected = true;
          }

        }

      } else {
        //$window.alert("Selezionare una porta");
        error("Warning", "Selezionare una porta", "warning");
      }
      
    };
    $scope.disconnect = function() {
      $scope.connected = false;
      SerialPortService.close();

    };

  }
]);
