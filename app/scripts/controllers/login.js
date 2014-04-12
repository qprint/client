'use strict';

angular.module('qprintApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            });
    })
    .controller('MainCtrl', function ($scope, $rootScope, Printer, Job, User) {

    });