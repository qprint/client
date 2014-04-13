'use strict';

angular.module('qprintApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'LoginCtrl'
            });
    })
    .controller('LoginCtrl', function ($scope, $location, $rootScope, Printer, Job, User) {
        $rootScope.setActivePage('login');
        $scope.user = {};
        $scope.login = function(){
            User.login($scope.user, function(){
                $location.path('/main');
            });
        };
        $scope.signUp = function(){
            User.register($scope.user, function(){
                User.login($scope.user, function(){
                    $location.path('/main');
                })
            })
        };
    });