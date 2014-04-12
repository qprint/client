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
    });
