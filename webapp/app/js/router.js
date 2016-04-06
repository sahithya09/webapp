// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'util/constants',
  'views/dashboard/dashboard',
  'views/new/new',
  'views/nav/nav',
  'views/detail/detail-models',
  'views/detail/detail-results'
], function($, _, Backbone, Constants, DashboardView, NewAppView, NavView, DetailView,DetailResultsView){
  var navView = new NavView();
  navView.render();

  var Router = Backbone.Router.extend({
    before: function(params, next){

      this.trigger('cleanup');
      return next();
    },
    after: function(){},
    route : function(route, name, callback){
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        var next = function(){
          callback && callback.apply(router, args);
          router.trigger.apply(router, ['route:' + name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
          router.after.apply(router, args);
        }
        router.before.apply(router, [args, next]);
      });
      return this;
    },
    routes: {
      // Define some URL routes
      '': 'home',
      'new': 'newApp',
      "experiments/:id": "experiment",
      "experiments/:id/models": "experimentModels",
      "experiments/:id/results": "experimentResults",
      // Default
      '*actions': 'defaultAction'
    },

    home: function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      var dashboardView = new DashboardView();
      dashboardView.setRouter(this);
      dashboardView.render();
      dashboardView.listenTo(this, 'cleanup', dashboardView.undelegateEvents);
      console.log("-= Dashboard render complete.")
    },
    newApp: function() {
      var newAppView = new NewAppView();
      newAppView.setRouter(this);
      newAppView.listenTo(this, 'cleanup', newAppView.undelegateEvents);
      newAppView.render();

      // Render icons
      Constants.renderIcons();
    },

    experiment: function(id) {
      const path = Backbone.history.getFragment();
      this.navigate(path+'/models', { trigger: true });
    },
    experimentModels: function(id) {
      var detailView = new DetailView({'eid':id});
      detailView.setRouter(this);
      detailView.renderModelTab();
      detailView.listenTo(this, 'cleanup', detailView.undelegateEvents);
      // Render icons
      Constants.renderIcons();
    },
    experimentResults: function(id) {
      var detailResultsView = new DetailResultsView({'eid':id});
      console.log(detailResultsView);
      detailResultsView.setRouter(this);
      detailResultsView.renderResultsTab();
      detailResultsView.listenTo(this, 'cleanup', detailResultsView.undelegateEvents);
      // Render icons
      Constants.renderIcons();
    },
    defaultAction: function() {
      // We have no matching route, lets just log what the URL was
      console.log('No route:');
    }

  });

  var initialize = function(options){
    console.log("-= Initalizing Router...")
    var appRouter = new Router;
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});