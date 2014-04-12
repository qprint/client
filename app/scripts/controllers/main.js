'use strict';

angular.module('qprintApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            });
    })
    .controller('MainCtrl', function ($scope, $rootScope, Printer, Job, User, $location) {
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
                $scope.currentLocation = {latitude: initialLocation.lat(), longitude: initialLocation.lng()};
                $scope.map.markers.push({
                    latitude: initialLocation.lat(),
                    longitude: initialLocation.lng(),
                    showWindow: false,
                    name: 'Ваше местоположение',
                    type: 0
                });

//                alert(JSON.stringify($scope.map.center));
                getPrinters();
            }, function() {
//                handleNoGeolocation(browserSupportFlag);
            });
        }

        $scope.step = 'first';

        function getClosestPrinter(){
            var minDistance = Number.MAX_VALUE;
            var closestPrinter = {};
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
            return closestPrinter;
        }

        function getPrinters(){
            Printer.getPrinters(function(data){
                $scope.printers = data;
                _.each(data, function(item){
                    item.load = Math.round(item.load/60);
                    item.type = 1;
                    item.latitude = parseFloat(JSON.parse(item.location)[0]);
                    item.longitude = parseFloat(JSON.parse(item.location)[1]);
                    item.showWindow = true;
                    item.type = 1;
                    item.load = item.id*2;
                    $scope.map.markers.push(item);
                    return item;
                });
                $scope.printer = getClosestPrinter();
            });
        }

        $scope.onFilesUploaded = function(job){
            alert(JSON.stringify(job));
            $scope.currentJob = JSON.parse(job).data;
            $scope.goToDetails();
        };

        $scope.goToDetails = function(){
            $scope.step = 'second';
            $scope.currentJob.printer = $scope.printer;
            Job.updateJob($scope.currentJob, function(data){

            });
        };

        $scope.onMarkerClicked = function(m){
            $scope.printer = m;
        };

        $scope.confirmOrder = function(){
            Job.confirm($scope.currentJob.id, function(data){
               $scope.step = 'third';
            });
        };

        $scope.cancelOrder = function(){
          Job.deleteJob($scope.currentJob.id, function(){
              $location.path('/');
          })
        };

        $scope.login = function (){
              User.login({username: 'test123', password:'123'}, function(){})
        };

        $scope.login();


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
