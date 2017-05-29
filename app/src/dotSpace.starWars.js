(function() {
  angular.module('dotSpace.starWars', [])
})();

(function() {
  angular.module('dotSpace.starWars').factory('swapiService', swapiService)
  
  swapiService.$inject = ['$http', '$q']
  
  function swapiService($http, $q) {
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
    
    function createURL(resource, {id = 0, page = 0, searchString = ''} = {}) {
      let url = ''
    
      if (angular.isDefined(resource) && resources.some(arrVal => resource === arrVal)) {
        url = `${resource}/`
      } else {
        return $q.reject(`Invalid resource: "${resource}"`)
      }

      if (id !== 0 && Number.isInteger(id)) {
        url = url + id
      } else { // If options.id is specified a single item is requested, so no need for pages or search
        let subOptions = []
        const searchRegEx = /^[\d\w\s]{1,15}$/i
        
        if (searchString !== '') {
          if (searchRegEx.test(searchString)) {
            subOptions.push(`search=${searchString}`)
          } else {
            return $q.reject(`Bad search string: "${searchString}"`)
          }
        }
        if (page !== 0 && Number.isInteger(page)) {
          subOptions.push(`page=${page}`)
        }

        if (subOptions.length !== 0) {
          url = url + '?' + subOptions.join('&')
        }
      }
      return $q.resolve(swapi + url)
    }
  }
})();