feedme = require '../public/js/location.js'

chai = require 'chai'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'
expect = chai.expect
chai.use(sinonChai)

# This makes the window object available in our code
global.window = this

describe "Getting the location from a user", ->
  navigator = null

  it 'asks the navigator for the current location', ->
    navigator = {
      geolocation: {
        getCurrentPosition: sinon.spy()
      }
    }
    feedme.locate(navigator)
    expect(navigator.geolocation.getCurrentPosition).to.have.been.called

  it 'returns the current location', ->
    emptyPosition = {}
    navigator = {
      geolocation: {
        getCurrentPosition: (f)-> f(emptyPosition)
      }
    }
    position = null
    callback = (pos)->
      position = pos

    feedme.locate(navigator, callback)
    expect(position).to.equal(emptyPosition)

  it 'sets the location', ->
    theLocation = 'LOCATION SET'
    position = { coords: theLocation }

    navigator = {
      geolocation: {
        getCurrentPosition: (f)-> f(position)
      }
    }
    feedme.setCurrentLocation(navigator)
    expect(window.currentLocation).to.equal(theLocation)


