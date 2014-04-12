'use strict';

angular.module('qprintApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            });
    })
    .controller('MainCtrl', function ($scope, Printer, Job) {
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };
        $scope.step = 'first';
        $scope.currentJob = {
            price: 31,
            orderCode: 11312,
            file:{
                name: 'qwerty.doc',
                pages: 5,
                copies: 1
            },
            printerId: 1
        };
        Printer.getPrinters(function(data){
            $scope.printers = data;
            _.each(data, function(item){
                item.load = Math.round(item.load/60);
                return item;
            });
        });

        $scope.onFilesUploaded = function(job){
            alert(job);

            $scope.step = 'second';
        };

        $scope.goToDetails = function(){
            $scope.step = 'second';
        };

        $scope.confirmOrder = function(){
            Job.confirm($scope.currentJob.id, function(data){
               $scope.step = 'third';
            });
        };


    });
