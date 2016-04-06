define([
    'underscore',
    'backbone',
    'util/constants',
    ], function(_, Backbone, Constants) {
    var Experiment = Backbone.Model.extend({
        urlRoot: Constants.base_url + '/v1/experiments',
        url:function(){
            if (this.get('id') === undefined) {
                return this.urlRoot;
            } else {
                return this.urlRoot + "/" + this.get('id')
            }
            console.log(this.urlRoot);
        },
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
    return Experiment;
});