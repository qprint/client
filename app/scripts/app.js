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
            $rootScope.messages.unshift(message);
            setTimeout(function(){
                message.class = 'display';
            }, 0);
        };
        $rootScope.closeMessage = function(message){
            message.class = '';
            setTimeout(function(){
                $rootScope.messages.splice($rootScope.messages.indexOf(message),1);
            },300);
        };
        $rootScope.setActivePage = function(page){
            $rootScope.isMainActive = $rootScope.isProfileActive = $rootScope.isOrdersActive =
                $rootScope.isHomeActive = $rootScope.isLoginActive = '' ;
            switch (page){
                case 'main':
                    $rootScope.isMainActive = 'current';
                    break;
                case 'profile':
                    $rootScope.isProfileActive = 'current';
                    break;
                case 'orders':
                    $rootScope.isOrdersActive = 'current';
                    break;
                case 'home':
                    $rootScope.isHomeActive = 'current';
                    break;
                case 'login':
                    $rootScope.isLoginActive = 'current';
                    break;
            }
        };
        function ping(){
            Job.getNotifications(function(data){
                _.each(data,function(item){
                    if(item.state == 'completed'){
                        Job.getJob(item.id, function(job){
                            if(job.state == 'completed'){
                                $rootScope.addMessage(job);
                            }
                        });
                    }
                });
            });

            setTimeout(ping, 3000);
        }
        ping();


    });
