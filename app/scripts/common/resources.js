angular.module('qprintApp')
    .factory('Printer', ['$http', function($http){
        var service = {
            getPrinters: function(callback){
//                $http.get('api/printer').success(callback);
                callback([
                    {id:1, name:'РИНХ', load: 60*4},
                    {id:2, name: 'Призрак', load: 60*10}
                ])
            }
        };
        return service;
    }])
    .factory('Job', ['$http', function($http){
        var service = {
            getJobs: function(callback){
                $http.get('api/job/').success(callback);
            },
            getJob: function(id, callback){
                $http.get('api/job/' + id).success(callback);
            },
            updateJob: function(job, callback){
                $http.post('api/job/' + job.id, job).success(callback);
            },
            getNotifications: function(callback){
                $http.get('api/notification/').success(callback);
            },
            confirm: function(id, callback){
//                $http.get('api/job/'+ id + '/print/').success(callback);
                callback({});
            }
        };
        return service;
    }])
    .factory('User', ['$http', function($http){
        var service = {
            login: function(cridentials, callback){
            },
            getProfile: function(callback){
                $http.get('api/profile/').success(callback);
            }
        };
        return service;
    }]);