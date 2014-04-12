angular.module('qprintApp')
    .directive('dropzone', function() {
        return {
            restrict: 'EA',
            scope: {
                callback: '&callback'
            },
            link: function(scope, el, attrs) {
                el.dropzone({
                    url: attrs.url,
                    maxFilesize: 5,
                    init: function() {
                        this.on('success', function(file, json) {
                            scope.$apply(function(){
                                scope.callback({job: job});
                            });
                        });
                        this.on('error', function(file, json) {
                            scope.$apply(function(){
                                scope.callback({job: json});
                            });
                        });
                        this.on('addedfile', function(file, job) {

                        });
                    }
                })
            }
        }
    });