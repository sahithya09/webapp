define([
	'jquery',
	'underscore',
	'backbone',
	'models/experiment',
	'util/constants'
	],
	function($, _, Backbone, Experiment, Constants) {
		var ExperimentCollection = Backbone.Collection.extend({
			url: Constants.base_url + '/v1/experiments',
			model: Experiment,
			meta: {},
			initialize: function() {
			},
			parse: function (response) {
				if (response.data) {
					return response.data;
				}
				return response;
			}
		});
		return ExperimentCollection;
	});