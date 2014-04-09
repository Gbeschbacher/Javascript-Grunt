index = module.exports = {}
index.get = (request, response, next) ->
  model = {}
  response.render "layout", model
