(function() {
  window.angular.module('dotSpace.starWars', ['ngCleanToast'])
})();

(function() {
  window.angular.module('dotSpace.starWars').controller('planetsController', planetsController)
  
  planetsController.$inject = ['swapiService']
  
  function planetsController (swapiService) {
    const vm = this
    swapiService.getResource('planets').then(planets => {
      vm.res = planets.results
    })
  }
})();

(function() {
  window.angular.module('dotSpace.starWars').factory('swapiService', swapiService)
  
  swapiService.$inject = ['$http', 'toasts']
  
  function swapiService($http, toasts) {
    const swapi = '//swapi.co/api/'
    const resources = [
      'planets'
    ]
    
    return {
      getResource: getResource
    }
    
    function getResource(resource, id, page) {
      // TODO validate id with RegEx
      // TODO create var for id if supplied
      // TODO validate page with RegEx
      // TODO create var for page if supplied
      const url = swapi + resource + '/'
      return $http.get(url)
        .then(res => res.data)
        .catch(err => toasts.create(toasts.type('error'), err.status, url + ' ' + err.statusText, toasts.sticky))
    }
    
    function createURL(resource, id, page) {
      let url = ''
      return new Promise((resolve, reject)=> {
        if (window.angular.isDefined(resource) && resources.some(arrVal => resource === arrVal)) {
          url = resource + '/'
        } else {
          return reject()
        }
        
        const idRegExp = new RegExp('/[0-9]{1,2}/')
        
        if (window.angular.isDefined(id) && id.test(idRegExp)) {
          url += id + '/'
        }
        
        const pageRegExp = new RegExp('/[0-9]{1,1}/')
        
        if (window.angular.isDefined(page) && id.test(pageRegExp)) {
          url += '?page=' + page
        }
      })
    }
  }
})();