'use strict';

/* Services */

var viewpanelServices = angular.module('viewpanelApp.services', []);

viewpanelServices.service('SerialPortService', [function () {
	var SerialPort = require('serialport');
  var isOpen = false;
  var serialPort;
  var error = function (title, message, type) {
    swal({
      title: title,
      text: message, 
      type: type,
      allowEscapeKey: true,
      allowOutsideClick: true
    });
  };

  var dataParse = function (data) {
    // da fare
  };

	this.list = function () {
    var promise = new Promise(function (resolve, reject) {
      SerialPort.list(function (err, ports) {
        resolve(ports);
      });
    });
    return promise;
	};

  this.open = function (selectedPort) {
     serialPort = new SerialPort.SerialPort(selectedPort, {
      baudrate: 9600,
      // look for return and newline at the end of each data packet:
      parser: SerialPort.parsers.readline("\n")
    });

    /* Adds the listener function to the end of the listeners array for the specified event. 
    No checks are made to see if the listener has already been added. Multiple calls 
    passing the same combination of event and listener will result in the listener being 
    added, and called, multiple times. */
    serialPort.on("open", function (error) {
      if (error) {
        console.log('failed to open: ' + error);
      } else {
          console.log('open');
          isOpen = true;
          serialPort.on('data', function (data) {
            console.log('data received: ' + data);
            dataParse(data);
          });
          serialPort.on('close', function () {
            console.log('close');
          });
          serialPort.on('error', function (error) {
            console.log('error:' + error);
          });
        }
      });
  };

  this.close = function () {
    console.log('close()');
    serialPort.close(function (error) {
      isOpen = false;
      if (error) {
        console.log('error:' + error);
      }
    });
  };

}]);