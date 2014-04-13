/**
 * Created by mrgusev on 13/04/14.
 */
'use strict';

angular.module('qprintApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/orders', {
                templateUrl: 'views/orders.html',
                controller: 'OrderCtrl'
            });
    })
    .controller('OrderCtrl', function ($rootScope, $scope, Job, User, $location) {
        $rootScope.setActivePage('orders');
        Job.getJobs(function(data){
            var counter = 0;
            data = data.slice(0, 5);
            _.each(data, function(item){
                item.time = new Date(new Date().setHours(Math.round(Math.random()*12))).setMinutes(Math.round(Math.random()*60));
                counter++;
                return item;
            });
            $scope.myOrders = _.sortBy(data, function(item){ return item.time;});
        });

        $scope.increaseBalance = function(){
            User.updateBalance($scope.profile.balance+3000, function(){
                User.getProfile(function(data){
                    $scope.profile = data;
                });
            });
        };
    });
