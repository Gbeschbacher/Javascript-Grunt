
#require all testfiles
tests = []
for file of window.__karma__.files
	tests.push file  if /Spec\.js$/.test(file)  if window.__karma__.files.hasOwnProperty(file)
require.config
	paths:
		angular: "vendor/angular"
		jquery: "vendor/jquery.min"
		bootstrap: "vendor/bootstrap.min"
		chai: "vendor/chai"


	baseUrl: "/base/public/js/"
	shim:
		angular:
			exports: "angular"
		chai:
			exports: "chai"
		jquery:
			exports: "$"
		bootstrap:
			deps: ["jquery"]

	priority: ["angular"]

	deps: tests
	callback: window.__karma__.start
