# starWars

This application provides an AngularJS interface for [SWAPI](https://swapi.co). A modern browser is required - Chrome 60, Firefox 53 and Safari 10.1 have been tested, but any current browser should work (IE11 is not current 😐). 

## Installation

Run `npm install`. This will install all dependencies including Bower. This is not required for general use, but will allow tests and a live demo to be run. See [Development](#Development). 

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

- `options` is an **optional** object. Acceptable properties are `page` and `id`, only one of which should be passed per request. If both are passed, only `id` is evluated. For more details, please see the [Examples](#Examples) below. 

The full resource data is returned as per the [SWAPI documentation](http://swapi.co/documentation#planets). 

## Examples

A live example can be run with `npm start`. This demonstrates a simple request for `planets` resource. 

### Pagination

The SWAPI API supplies resouces in pages of 10 and supports simple pagination. This is provided in `swapiService.get()` via `options.page`. 

```javascript
(function() {
  angular.module('testapp', ['dotSpace.starWars'])
  .controller('testController', function() {
    const vm = this

    swapiService.get('planets', {page:2})
    .then(planets => {
      vm.data = planets.results
      // ...
    })
    .catch(err => alert)
  })
})();
```



## Development

### Style

- Application source is held in `app/src`
- Code follows [John Papa's Angular 1.x style guide](https://github.com/johnpapa/angular-styleguide/tree/master/a1)
- ES6 syntax is utilised wherever appropriate (arrow functions, let/const, template strings)
- Semicolons are NOT used at the end of lines except for IIFE where they are required by the JS engine
- It is not required that you are a Star Wars fan - live long and prosper if you wish 🖖

### Testing

Due to ES6 being used extensively, a modern browser is required to run. Unfortunately this also rules out PhantomJS (without utilising Babel or some ES6 shim), so real browsers are required at the moment. 

`npm test` will open Chrome, Firefox and Safari and execute all tests with Karma and Jasmine. `Ctrl+C` ends the test runner. Amend `karma.conf.js` to run with different/fewer browsers but remember to revert before any pull request. 