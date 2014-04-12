angular.module('qprintApp')
    .factory('Printer', ['$http', function($http){
        var service = {
            getPrinters: function(callback){
                $http.get('api/printer').success(callback);
//                callback([
//                    {id:1, name:'РИНХ', load: 60*4, geometry: {
//                        type: 'Point',
//                        "latitude":47.2225077,
//                        "longitude":39.71821769999997
//                    },properties: {
//                        balloonContent: 'РИНХ'
//                    }},
//                    {id:2, name: 'Призрак', load: 60*10,geometry: {
//                        type: 'Point',
//                        latitude: 37.8,
//                        longitude: 55.85
//                    },properties: {
//                        balloonContent: 'Призрак'
//                    }}
//                ])
            }
        };
        return service;
    }])
    .factory('Job', ['$http', function($http){
        var service = {
            getJobs: function(callback){
                $http.get('api/job').success(callback);
            },
            getJob: function(id, callback){
                $http.get('api/job/' + id).success(callback);
            },
            updateJob: function(job, callback){
                $http.post('api/job/' + job.id, job).success(callback);
            },
            deleteJob: function(id, callback){
                $http.delete('api/job/' + id).success(callback);
            },
            getNotifications: function(callback){
                $http.get('api/notification').success(callback);
            },
            confirm: function(id, callback){
                $http.get('api/job/'+ id + '/confirm/').success(callback);
            }
        };
        return service;
    }])
    .factory('User', ['$http', function($http){
        function httpserialize(object) {
            var serialized_str = '';
            for (var key in object) {
                serialized_str += key + '=' + object[key] + '&';
            }
            return serialized_str.slice(0, -1)
        }
        var service = {
            login: function(cridentials, callback){
                $http.post('api/login', httpserialize(cridentials)).success(callback);
            },
            getProfile: function(callback){
                $http.get('api/profile').success(callback);
            },
            updateBalance: function(balance, callback){
                $http.post('api/profile', httpserialize({'balance': balance})).success(callback);
            }
        };
        return service;
    }]);