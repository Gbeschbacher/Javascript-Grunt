routes = module.exports = (app, controllers, middlewares) ->
	app.get "/", controllers.index.get