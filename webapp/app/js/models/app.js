define([
    'underscore',
    'backbone',
    'util/constants',
    ], function(_, Backbone, Constants) {
    var App = Backbone.Model.extend({
        urlRoot: Constants.base_url + '/v1/apps',
        url:function(){
            if (this.get('id') === undefined) {
                return this.urlRoot;
            } else {
                return this.urlRoot + "/" + this.get('asset_id')
            }
        },
        defaults: {
            // Basic properties
            name: ''
        },
        initialize: function(){

        }
    });

    // Return this object so we can call var x = new App()
    return App;
});