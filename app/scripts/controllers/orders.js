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
//            data = data.slice(0, 5);
            _.each(data, function(item){
                item.time = new Date(item.datetime_queued * 1000 - (new Date()).getTimezoneOffset()*60000);
                return item;
            });
            $scope.myOrders = data;
        });

        $scope.increaseBalance = function(){
            User.updateBalance($scope.profile.balance+3000, function(){
                User.getProfile(function(data){
                    $scope.profile = data;
                });
            });
        };
    });
