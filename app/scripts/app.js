'use strict';

angular
    .module('qprintApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    });
