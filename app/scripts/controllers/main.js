'use strict';

angular.module('qprintApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            });
    })
    .controller('MainCtrl', function ($scope, $rootScope, $route, Printer, Job, User, $location) {
        $rootScope.setActivePage('main');

        $scope.isMapShown = false;

        $scope.map = {
            center: {
                latitude: 37.8,
                longitude: -55.85
            },
            markers: [],
            zoom: 15
        };

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                $scope.map.center = {latitude: initialLocation.lat(), longitude: initialLocation.lng()};
                $scope.$apply(function(){
                    $scope.currentLocation = {
                        latitude: initialLocation.lat(),
                        longitude: initialLocation.lng(),
                        showWindow: false,
                        name: 'Ваше местоположение',
                        type: 0
                    };
                    $scope.map.markers.push($scope.currentLocation);
                    getPrinters();
                });

            }, function() {
                getPrinters();
//                handleNoGeolocation(browserSupportFlag);
            });
        } else{
            getPrinters();
        }

        $scope.step = 'first';

        function getClosestPrinter(){
            var minDistance = Number.MAX_VALUE;
            var closestPrinter;
            if($scope.currentLocation){
                _.each($scope.printers, function(item){
                    console.log(JSON.stringify(item));
                    var distance = Geometry.getDistance(item, $scope.currentLocation);
                    console.log(distance);
                    if(distance < minDistance){
                        minDistance = distance;
                        closestPrinter = item;
                    }
                });
                console.log(JSON.stringify(closestPrinter));
            }
            return closestPrinter;
        }

        function getPrinters(){
            Printer.getPrinters(function(data){
                $scope.printers = data;
                _.each(data, function(item){
                    item.load = Math.round(item.time_to_wait/60);
                    item.type = 1;
                    item.latitude = parseFloat(JSON.parse(item.location)[0]);
                    item.longitude = parseFloat(JSON.parse(item.location)[1]);
                    item.showWindow = true;
                    item.type = 1;
                    $scope.map.markers.push(item);
                    return item;
                });
                $scope.printer = data[0];
                $scope.printer = getClosestPrinter() || data[0];
            });
        }

        $scope.onFilesUploaded = function(job){
//            alert(JSON.stringify(job));
            $scope.currentJob = JSON.parse(job).data;
            $scope.goToDetails();
        };

        $scope.goToDetails = function(){
            $scope.step = 'second';
            $scope.currentJob.printer = $scope.printer;
            $scope.currentJob.fileExtension = getExtension($scope.currentJob.file);
            Job.updateJob($scope.currentJob, function(data){

            });
        };

        $scope.onMarkerClicked = function(m){
            if(m != $scope.currentLocation){
                m.showWindow = true;
                $scope.printer = m;
            }
        };

        $scope.confirmOrder = function(){
            Job.confirm($scope.currentJob.id, function(data){
               $scope.step = 'third';
            });
        };

        $scope.cancelOrder = function(){
          Job.deleteJob($scope.currentJob.id, function(){
              $route.reload();
          })
        };

        $scope.restart = function(){
            $route.reload();
        };

        function getExtension(filename) {
            var parts = filename.split('.');
            return parts[parts.length - 1];
        }

        var Geometry = {
            rad : function(x) {
                return x * Math.PI / 180;
            },
            getDistance : function(node1, node2) {
                var R = 6378137; // Earth’s mean radius in meter
                var dLat = Geometry.rad(node2.latitude - node1.latitude);
                var dLong = Geometry.rad(node2.longitude - node1.longitude);
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(Geometry.rad(node1.latitude)) * Math.cos(Geometry.rad(node2.latitude)) *
                    Math.sin(dLong / 2) * Math.sin(dLong / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                return d; // returns the distance in meter
            }
        };
    });
