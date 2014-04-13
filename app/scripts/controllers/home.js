'use strict';

angular.module('qprintApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            });
    })
    .controller('HomeCtrl', function ($scope, $rootScope, $route, Printer, Job, User, $location) {
        $rootScope.setActivePage('home');

    });
