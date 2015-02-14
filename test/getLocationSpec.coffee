feedme = require '../public/js/feedme.js'

chai = require 'chai'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'
expect = chai.expect
chai.use(sinonChai)

describe "Getting the location from a user", ->
  navigator = null

  # mocking the browser
  it 'asks the navigator for the current location', ->
    navigator = {
      geolocation: {
        getCurrentPosition: sinon.spy()
      }
    }
    feedme.locate(navigator)
    expect(navigator.geolocation.getCurrentPosition).to.have.been.called

  # the browser returns the position using a callback
  it 'returns the current location', ->
    emptyPosition = {}
    navigator = {
      geolocation: {
        getCurrentPosition: (callback)-> callback(emptyPosition)
      }
    }
    position = null
    callback = (thePosition)->
      position = thePosition

    feedme.locate(navigator, callback)
    expect(position).to.equal(emptyPosition)


  # set the users currentlocation to be the cordinates that the browser returns
  it 'sets the location', ->
    theLocation = 'LOCATION SET'
    position = { coords: theLocation }

    navigator = {
      geolocation: {
        getCurrentPosition: (f)-> f(position)
      }
    }
    feedme.setCurrentLocation(navigator)
    expect(feedme.currentLocation).to.equal(theLocation)
