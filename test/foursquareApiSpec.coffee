feedme = require '../public/js/feedme.js'

chai = require 'chai'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'
expect = chai.expect
chai.use(sinonChai)

describe 'Interacting with the Foursquare API', ->
  currentLocation = { latitude: 'HERE', longitude: 'THERE' }
  client = { id: 'clientId', secret: 'shhhh' }
  distance = 1000
  apiVersion = 'v3'
  category = 'testing'

  it 'adds a new client id', ->
    feedme.addClientId('1234')
    expect(feedme.client()).to.eql({id: '1234', secret: undefined})

  it 'adds a new client secret', ->
    feedme.addClientId('1234')
    feedme.addClientSecret('shhh')
    expect(feedme.client()).to.eql({id: '1234', secret: 'shhh'})

  it 'adds the distance', ->
    feedme.addDistance(1000)
    expect(feedme.distance).to.equal(1000)

  it 'add version', ->
    feedme.addFoursquareApiVersion(123)
    expect(feedme.foursquareVersion).to.equal(123)

  it 'returns the location as a string', ->
    expected = '&ll=HERE,THERE'
    expect(feedme.locationAsString(currentLocation)).to.equal(expected)

  it 'returns the client authentication as a string', ->
    expected = 'client_id=clientId&client_secret=shhhh'
    expect(feedme.foursquareCredentials(client)).to.equal(expected)

  it 'returns the radius as a string', ->
    expected = '&radius=1000'
    expect(feedme.radiusAsString(distance)).to.equal(expected)

  it 'returns the API version as a string', ->
    expected = '&v=v3'
    expect(feedme.apiVersionAsString(apiVersion)).to.equal(expected)

  it 'builds the url to the foursquare api', ->
    expected = 'https://api.foursquare.com/v2/venues/explore?' +
      'client_id=clientId&client_secret=shhhh&v=v3&ll=HERE,THERE' +
      '&radius=1000&query=testing'
    expect(feedme.buildFoursquareApiUrl(category, currentLocation, client,
      distance, apiVersion)).to.equal(expected)

