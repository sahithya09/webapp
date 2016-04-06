define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'util/constants',
  'models/app',
  'models/experiment',
  'text!/templates/new/step-one.html',
  'text!/templates/new/step-two.html',

], function($, _, Backbone, Router, Constants, App,Experiment,Steponetemplate,Steptwotemplate) {
  var DashboardView = Backbone.View.extend({
    el: $('#app'),
    initialize: function () {
    },
    events: {
      'click #add-exp-save-btn': 'save',
      'click #store-datasource':'storedatasource'
    },
    setRouter: function (router) {
      this.router = router;
    },
    render: function () {
      var compiledMainTemplate = _.template(Steponetemplate, {});
      $('#main').html(compiledMainTemplate);
    },
    save: function(ev) {
      ev.preventDefault();
      const that = this;
      // Create New
      const experiment = new Experiment({
        "name": $('#name-input').val(),
        "description": $('#desc-input').val(),
        "data_source": $('#datasource-varibles option:selected').val()
      });
      experiment.save().done(function(response){
        console.log("-= Successfully created new experiment! ");
        that.router.navigate('experiments/'+ experiment.get('id') + "/models", { trigger: true });
      });
    }
  });
  // Our module now returns our view
  return DashboardView;
});
