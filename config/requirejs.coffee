require.config
	paths:
		angular: "vendor/angular"
		jquery: "vendor/jquery.min"
		bootstrap: "vendor/bootstrap.min"

	baseUrl: "/js/"
	shim:
		angular:
			exports: "angular"

		jquery:
			exports: "$"

		bootstrap:
			deps: ["jquery"]


	priority: ["angular"]

require ["angular", "jquery"], (angular, $, app) ->
	"use strict"
