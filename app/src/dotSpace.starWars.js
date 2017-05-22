(function() {
  angular.module('dotSpace.starWars', [])
})();

(function() {
  angular.module('dotSpace.starWars').factory('swapiService', swapiService)
  
  swapiService.$inject = ['$http', '$q']
  
  function swapiService($http, $q) {

    // These consts are here to make adding of search and schema retrieval easier
    const swapi =  '//swapi.co/api/'
    const resources = [
      'planets'
    ]
    
    return {
      get: get,
      _createURL: createURL // Returned only for testing
    }
    
    function get(resource, options) {
      return createURL(resource, options)
      .then(getResource)
      .catch(getFailed) // Called on rejection from createURL() or $http.get() in getResource()
    }

    function getResource(url) {
      return $http.get(url)
      .then(res => res.data) // If no error, return only data part of response
    }

    // Log errors to console, but also return through Promise chain
    function getFailed(error) {
      console.error(error)
      return $q.reject(error)
    }
    
    function createURL(resource, options) {
      let url = ''
    
      if (angular.isDefined(resource) && resources.some(arrVal => resource === arrVal)) {
        url = `${resource}/`
      } else {
        return $q.reject(`Invalid resource: "${resource}"`)
      }
      
      if (options) {
        if (angular.isDefined(options.id) && (Number(options.id) != NaN)) {
          url = url + options.id
        } else { // If options.id is specified a single item is requested, so no need for pages
          if (angular.isDefined(options.page) && (Number(options.page) != NaN)) {
            url += `?page=${options.page}`
          }
        }
      }
      return $q.resolve(swapi + url)
    }
  }
})();