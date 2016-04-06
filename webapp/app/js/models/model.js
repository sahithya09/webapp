define([
    'underscore',
    'backbone',
    'util/constants',
], function(_, Backbone, Constants) {
    var Model = Backbone.Model.extend({
        urlRoot: Constants.base_url + '/v1/experiments/',
        url:function(){
            console.log(this)
            if (this.get('id') === undefined) {
                return this.urlRoot + this.get('experiment_id') + "/models"
            } else {
                return this.urlRoot + this.get('experiment_id') + "/models/" + this.get('id')
            }
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
        },
        train: function() {
            const that = this;
            $.ajax({
                url: that.url() + '/train',
                type:'POST',
            }).done(function(response) {
                console.log("=- Trianing complete!")
                that.set('status', 'trained');
            });                
        },
        deploy: function() {
            const that = this;
            $.ajax({
                url: that.url() + '/deploy',
                type:'POST',
            }).done(function(response) {
                console.log("=- Deploy complete!")
                that.set('status', 'deployed');
            });                
        }
    });
    // Return this object so we can call var x = new Experiment()
    return Model;
});