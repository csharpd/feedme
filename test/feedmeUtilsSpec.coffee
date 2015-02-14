feedme = require '../public/js/feedme.js'

chai = require 'chai'
expect = chai.expect

describe 'Misc utilities we have in feedme', ->
  describe 'sorting', ->
    it 'sorts the array with two objects by their name', ->
      objects = [{name: "Vegan"}, {name: "Ice cream"}]
      expectedObjects = [{name: "Ice cream"},{name: "Vegan"}]
      expect(objects.sort(feedme.compare)).to.eql(expectedObjects)
