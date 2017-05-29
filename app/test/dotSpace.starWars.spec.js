describe('swapiService', () => {
  let swapiService, $rootScope

  beforeEach(function() {
    module('dotSpace.starWars')

    inject(function($injector) {
      swapiService = $injector.get('swapiService')
      $rootScope = $injector.get('$rootScope')
    })
  })

  describe('swapiService._createURL function', () => {
    it('should return the url for planets', () => {
      swapiService._createURL('planets')
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/')
      })
      .catch(err => expect(err).toBeUndefined())

      $rootScope.$apply();
    })

    it('should return the url for planets, even with empty option object', () => {
      swapiService._createURL('planets', {})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

      it('should return the url for planets and not fail just because it didn\'t get valid options', () => {
      swapiService._createURL('planets', 'failure is not an option!')
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it('should return the url for planet 2', () => {
      swapiService._createURL('planets', {id:2})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/2')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it('should return the url for planet, ignoring bad ID', () => {
      swapiService._createURL('planets', {id:true})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it('should return the url for planet, ignoring bad ID', () => {
      swapiService._createURL('planets', {id:'twelve'})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it('should return the url for planets page 3', () => {
      swapiService._createURL('planets', {page:3})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/?page=3')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it('should return the url for planets, ignoring invalid page', () => {
      swapiService._createURL('planets', {page:'3'})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it('should return the url for planets, ignoring invalid page', () => {
      swapiService._createURL('planets', {page:'three'})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it('should return the url for planet 2 and ignore page', () => {
      swapiService._createURL('planets', {id:2,page:3})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/2')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it('should return an error because it got an invalid resource', () => {
      swapiService._createURL('plants')
      .then(url => {
        expect(url).toBeUndefined()
      })
      .catch(err => {
        expect(err).toBe('Invalid resource: "plants"')
      })
      $rootScope.$apply();
    })

    it('should return url for planets/?search=tatooine', () => {
      swapiService._createURL('planets', {searchString:'tatooine'})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/?search=tatooine')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it('should return url for planets/?search=e&page=2', () => {
      swapiService._createURL('planets', {searchString:'e', page:2})
      .then(url => {
        expect(url).toBe('//swapi.co/api/planets/?search=e&page=2')
      })
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply();
    })

    it('should return error for search because string has non-alphanumeric chars', () => {
      swapiService._createURL('planets', {searchString:'fudg£'})
      .then(url => {
        expect(url).toBeUndefined()
      })
      .catch(err => expect(err).toBe('Bad search string: "fudg£"'))
      $rootScope.$apply();
    })

    it('should return error for search because string is too long', () => {
      swapiService._createURL('planets', {searchString:'15 characters is a lot'})
      .then(url => {
        expect(url).toBeUndefined()
      })
      .catch(err => expect(err).toBe('Bad search string: "15 characters is a lot"'))
      $rootScope.$apply();
    })
  })

  describe('swapiService.get function', () => {
    let $httpBackend
    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend')
    }))

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation()
      $httpBackend.verifyNoOutstandingRequest()
    })

    it('should make API request for planets', () => {
      $httpBackend.expectGET('//swapi.co/api/planets/').respond([])
      
      swapiService.get('planets')
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should make API request for planets/2', () => {
      $httpBackend.expectGET('//swapi.co/api/planets/2').respond([])
      
      swapiService.get('planets', {id:2})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should make API request for page 3 of planets', () => {
      $httpBackend.expectGET('//swapi.co/api/planets/?page=3').respond([])
      
      swapiService.get('planets', {page:3})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should make API request for planets, ignoring invalid page', () => {
      $httpBackend.expectGET('//swapi.co/api/planets/').respond([])
      
      swapiService.get('planets', {page:'3'})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should make API request for planets, ignoring invalid page', () => {
      $httpBackend.expectGET('//swapi.co/api/planets/').respond([])
      
      swapiService.get('planets', {page:true})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should make API request for planets/2 and ignore page', () => {
      $httpBackend.expectGET('//swapi.co/api/planets/2').respond([])
      
      swapiService.get('planets', {id:2,page:3})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should search planets for tatooine', () => {
      $httpBackend.expectGET('//swapi.co/api/planets/?search=tatooine').respond([])
      
      swapiService.get('planets', {searchString:'tatooine'})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should search planets for e and return page 2', () => {
      $httpBackend.expectGET('//swapi.co/api/planets/?search=e&page=2').respond([])
      
      swapiService.get('planets', {searchString:'e', page:2})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should search planets for tatooine', () => {
      $httpBackend.expectGET('//swapi.co/api/planets/?search=tatooine').respond([])
      
      swapiService.get('planets', {searchString:'tatooine'})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should fail search request because it has bad characters', () => {
      swapiService.get('planets', {searchString:'Fudg£'})
      .then(url => {
        expect(url).toBeUndefined()
      })
      .catch(err => expect(err).toBe('Bad search string: "Fudg£"'))
      $rootScope.$apply();
    })

    it('should fail search request because it\'s to long', () => {
      swapiService.get('planets', {searchString:'15 characters is a lot'})
      .then(url => {
        expect(url).toBeUndefined()
      })
      .catch(err => expect(err).toBe('Bad search string: "15 characters is a lot"'))
      $rootScope.$apply();
    })

    it('should make API request for /planets, even with empty option object', () => {
      $httpBackend.expectGET('//swapi.co/api/planets/').respond([])

      swapiService.get('planets', {})
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should make API request for /planets and not fail just because it didn\'t get valid options', () => {
      $httpBackend.expectGET('//swapi.co/api/planets/').respond([])
      
      swapiService.get('planets', 'failure is not an option!')
      .then($httpBackend.flush())
      .catch(err => expect(err).toBeUndefined())
      $rootScope.$apply()
    })

    it('should make API request for planets and handle server-side failure', () => {
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