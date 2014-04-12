/**
 * Created by mrgusev on 12/04/14.
 */
'use strict';

angular.module('qprintApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/profile', {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl'
            });
    })
    .controller('ProfileCtrl', function ($scope, Job, User, $location) {
        Job.getJobs(function(data){
            $scope.myOrders = data;
        });

        User.getProfile(function(data){
           $scope.profile = data;
        });

        $scope.increaseBalance = function(){
            User.updateBalance($scope.profile.balance+3000, function(){
                User.getProfile(function(data){
                    $scope.profile = data;
                });
            });
        };
    });
