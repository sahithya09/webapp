define([
    'underscore',
    'backbone',
    'util/constants',
], function(_, Backbone, Constants) {
    var Model = Backbone.Model.extend({
        urlRoot: Constants.base_url + '/v1/templates',
        defaults: {
        },
        initialize: function(){
        },
        parse: function (response) {
            if (response.data) {
                return response.data;
            }
            return response;
        }
    });
    // Return this object so we can call var x = new Experiment()
    return Model;
});