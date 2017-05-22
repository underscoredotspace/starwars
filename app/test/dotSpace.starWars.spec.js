describe('swapiService', function() {
  let swapiService


  beforeEach(function() {
    module('dotSpace.starWars')

    inject(function($injector) {
      swapiService = $injector.get('swapiService')
      $rootScope = $injector.get('$rootScope')
    })
  })

  describe('swapiService._createURL function', function() {
    it("should return the url for planets", () => {
      swapiService._createURL('planets')
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/')
      })
      .catch(err => expect(err).toBeUndefined())

      $rootScope.$apply();
    })

    it("should return the url for planets, even with empty option object", () => {
      swapiService._createURL('planets', {})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

      it("should return the url for planets and not fail just because it didn't get valid options", () => {
      swapiService._createURL('planets', 'failure is not an option!')
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it("should return the url for planet 2", () => {
      swapiService._createURL('planets', {id:2})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/2')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it("should return the url for planets page 3", () => {
      swapiService._createURL('planets', {page:3})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/?page=3')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it("should return the url for planet 2 and ignore page", () => {
      swapiService._createURL('planets', {id:2,page:3})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/2')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it("should return an error because it got an invalid resource", () => {
      swapiService._createURL('plants')
      .then(url => {
        expect(url).toBeUndefined()
      })
      .catch(err => {
        expect(err).toBe('Invalid resource: "plants"')
      })
      $rootScope.$apply();
    })
  })

  describe('swapiService.get function', function() {
    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend')
    }))

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()
    })

    it('should make API request for planets', function() {
      $httpBackend.expectGET('//swapi.co/api/planets/').respond([])
      
      swapiService.get('planets')
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should make API request for planets/2', function() {
      $httpBackend.expectGET('//swapi.co/api/planets/2').respond([])
      
      swapiService.get('planets', {id:2})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should make API request for page 3 of planets', function() {
      $httpBackend.expectGET('//swapi.co/api/planets/?page=3').respond([])
      
      swapiService.get('planets', {page:3})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should make API request for planets/2 and ignore page', function() {
      $httpBackend.expectGET('//swapi.co/api/planets/2').respond([])
      
      swapiService.get('planets', {id:2,page:3})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it("should make API request for /planets, even with empty option object", () => {
      $httpBackend.expectGET('//swapi.co/api/planets/').respond([])

      swapiService.get('planets', {})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it("should make API request for /planets and not fail just because it didn't get valid options", () => {
      $httpBackend.expectGET('//swapi.co/api/planets/').respond([])
      
      swapiService.get('planets', 'failure is not an option!')
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should make API request for planets and handle server-side failure', function() {
      $httpBackend.expectGET('//swapi.co/api/planets/').respond(500, '')
      
      swapiService.get('planets')
      .then(url => {
        expect(url).toBeUndefined()
      })
      .catch(error => {
        expect(error.status).toBe(500)
      })
      $httpBackend.flush()
      $rootScope.$apply()
    })
  })

})