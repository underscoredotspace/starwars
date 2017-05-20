describe('swapiService._createURL function', function() {
  let swapiService

  function promiseCatch(err) {
    expect(err).toBeUndefined()
  }

  beforeEach(function() {
    module('dotSpace.starWars')

    inject(function($injector) {
      swapiService = $injector.get('swapiService')
    })
  })

  it("should return the url for planets", (done) => {
    swapiService._createURL('planets')
    .then(url => {
      expect(url).toBe('//swapi.co/api/planets/')
      done()
    })
    .catch(promiseCatch)
  })

  it("should return the url for planets, even with empty option object", (done) => {
    swapiService._createURL('planets', {})
    .then(url => {
      expect(url).toBe('//swapi.co/api/planets/')
      done()
    })
    .catch(promiseCatch)
  })

    it("should return the url for planets and not fail just because it didn't get valid options", (done) => {
    swapiService._createURL('planets', 'failure is not an option!')
    .then(url => {
      expect(url).toBe('//swapi.co/api/planets/')
      done()
    })
    .catch(promiseCatch)
  })

  it("should return the url for planet 2", (done) => {
    swapiService._createURL('planets', {id:2})
    .then(url => {
      expect(url).toBe('//swapi.co/api/planets/2')
      done()
    })
    .catch(promiseCatch)
  })

  it("should return the url for planets page 3", (done) => {
    swapiService._createURL('planets', {page:3})
    .then(url => {
      expect(url).toBe('//swapi.co/api/planets/?page=3')
      done()
    })
    .catch(promiseCatch)
  })

  it("should return an error because it got an invalid resource", (done) => {
    swapiService._createURL('plants')
    .then(url => {
      expect(url).toBeUndefined()
      done()
    })
    .catch(err => {
      expect(err).toBe('Invalid resource: "plants"')
      done()
    })
  })
})