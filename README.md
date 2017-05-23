# starWars 🌑

[![Build Status](https://travis-ci.org/underscoredotspace/starwars.svg?branch=master)](https://travis-ci.org/underscoredotspace/starwars) [![Coverage](https://coveralls.io/repos/github/underscoredotspace/starwars/badge.svg?branch=master)](https://coveralls.io/github/underscoredotspace/starwars?branch=master)

This application provides an AngularJS interface for [SWAPI](https://swapi.co). A modern browser is required - Chrome 60, Firefox 53 and Safari 10.1 have been tested, but any current browser should work (for the avoidance of doubt, IE11 is not current 😐). 

## Installation

Run `npm install` to install all dependencies including those on Bower. This is not required for general use, but will allow tests and a live demo to be run. See [Development](#development). 

Inject to your Angular module thus:

````javascript
(function() {
  angular.module('myApp', ['dotSpace.starWars'])
})();
````

## API

`dotSpace.starWars` provides a single service `swapiService` with 1 public function `get()` which returns a Promise (with $q). 

`get()` accepts 2 parameters, `resource` and `options`: 

- `resource` is the name of the SWAPI resource required - currently only 'planets' is available. 

- `options` is an **optional** object. Acceptable properties are `page` and `id`, only one of which should be passed per request. If both are passed, only `id` is evaluated. For more details, please see the [Examples](#examples) below. 

The full resource data is returned as per the [SWAPI documentation](http://swapi.co/documentation#planets). 

## Examples

A live example can be run with `npm start`. This demonstrates a simple request for `planets` resource with pagination using ngRoute. The demo is not a suggested implementation, you can do better 😂. 

### Pagination (`options.page`)

The SWAPI API supplies resouces in pages of 10 and supports simple pagination. This is provided in `swapiService.get()` via `options.page`. 

```javascript
(function() {
  angular.module('testapp', ['dotSpace.starWars'])
  
  .controller('testController', testController)
  testController.$inject = ['swapiService']

  function testController(swapiService) {
    const vm = this

    swapiService.get('planets', {page:2}) // Requests page 2 of planets resource
    .then(planets => {
      vm.data = planets.results
      // ...
    })
    .catch(err => alert)
  })
})();
```

### Single resource (`options.id`)

Retrieve a single resource in exactly the same way as above, but pass `{id:resourceid}` instead: 

```javascript
  // ...
  swapiService.get('planets', {id:3}) // Requests the planet with ID of 3
  // ...
```

### Search (`options.searchString`)

Search for a planet with an alphanumeric string up to 15 characters, including spaces. This can be used along with [pagination](#pagination): `{searchString:'e', page:1}`. 

```javascript
  // ...
  swapiService.get('planets', {searchString:'tatooine'}) // Searches planets resource for 'tatooine'
  // ...
```

## Development

### Style

- Application source is held in `app/src`
- Code follows [John Papa's Angular 1.x style guide](https://github.com/johnpapa/angular-styleguide/tree/master/a1)
- ES6 syntax is utilised wherever appropriate (arrow functions, let/const, template strings)
- Semicolons are NOT used at the end of lines except for IIFE where they are required by the JS engine
- No external dependencies should be added for this very simple service
- It is not required that you are a Star Wars fan - live long and prosper if you wish 🖖

### Testing

Due to ES6 being used extensively, a modern browser is required to run. Unfortunately this also rules out PhantomJS (without utilising Babel or similar) as it does not support ES6, so real browsers are required at the moment. 

`npm test` will open Chrome Headless which requires Chrome 59 or later to be installed. All tests matching `app/tests/*.spec.js` are run with Karma and Jasmine. 

`npm run browser-test` runs the same tests, but opens Safari, Chrome and Firefox. 

Coverage reports in html and lcov will be generated on successful test run in `coverage/`. There's no reason for less than 🌟 100% 🌟 coverage due to the application structure (thanks JP)