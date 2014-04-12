'use strict';

angular
    .module('qprintApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'google-maps'
    ])
    .config(function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    }).run(function($rootScope, Job){
        $rootScope.messages = [];
        $rootScope.addMessage = function(message){
            $rootScope.messages.push(message);
            message.class = 'display';
        };
        $rootScope.closeMessage = function(message){
            message.display = '';
            $rootScope.messages.splice($rootScope.messages.indexOf(message),1);
        };

        function ping(){
            Job.getNotifications(function(data){
                _.each(data,function(item){
                    var message = {};
                    $rootScope.addMessage(message);
                });
                setTimeout(ping, 1000);
            });
        }
    });
