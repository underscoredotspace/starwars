(function() {
  angular.module('dotSpace.starWars', ['ngCleanToast'])
})();

(function() {
  angular.module('dotSpace.starWars').controller('planetsController', planetsController)
  
  planetsController.$inject = ['swapiService', '$scope', 'toasts']
  
  function planetsController (swapiService, scope, toasts) {
    const vm = this
    swapiService.get('plantes', {page:2})
    .then(planets => {
      scope.$apply(function() {
        vm.res_planets = planets
      })
    })
    .catch(err => {
      scope.$apply(function(){toasts.create(toasts.type('error'), '', err, toasts.sticky)})
    })
  }
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
      _createURL: createURL
    }
    
    function get(resource, options) {
      return createURL(resource, options)
      .then(url => $http.get(url))
      .then(res => res.data)
      .catch(getFailed)
    }

    function getFailed(error, resource, options) {
      console.error(error)
      return $q.reject(error)
    }
    
    function createURL(resource, options) {
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