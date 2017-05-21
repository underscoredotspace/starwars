(function() {
  angular.module('dotSpace.starWars', ['ngCleanToast'])
})();

(function() {
  angular.module('dotSpace.starWars').controller('planetsController', planetsController)
  
  planetsController.$inject = ['swapiService', '$scope']
  
  function planetsController (swapiService, scope) {
    const vm = this
    swapiService.getResource('planets', {page:2})
    .then(planets => {
      scope.$apply(function() {
        vm.res_planets = planets
      })
    })
  }
})();

(function() {
  angular.module('dotSpace.starWars').factory('swapiService', swapiService)
  
  swapiService.$inject = ['$http', 'toasts']
  
  function swapiService($http, toasts) {
    const resources = [
      'planets'
    ]
    
    return {
      getResource: getResource,
      _createURL: createURL
    }
    
    function getResource(resource, options) {
      return createURL(resource, options)
      .then(url => $http.get(url))
      .then(res => res.data)
      .catch(err => toasts.create(toasts.type('error'), err.status, url + ' ' + err.statusText, toasts.sticky))
    }
    
    function createURL(resource, options) {
      const swapi =  '//swapi.co/api/'
      let url = ''
      
      return new Promise((resolve, reject)=> {
        if (angular.isDefined(resource) && resources.some(arrVal => resource === arrVal)) {
          url = resource + '/'
        } else {
          return reject(`Invalid resource: "${resource}"`)
        }
        
        if (options) {
          if (angular.isDefined(options.id) && (Number(options.id) != NaN)) {
            url = url + options.id
          } else {
            if (angular.isDefined(options.page) && (Number(options.page) != NaN)) {
              url += '?page=' + options.page
            }
          }
        }
        
        resolve(swapi + url)
      })
    }
  }
})();