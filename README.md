![Ziptsatic Logo](https://www.getziptastic.com/static/images/ziptastic-logo.png)

# Official Ziptastic jQuery plugin!
Seamlessly integrate [Ziptastic!](https://www.getziptastic.com) with jQuery

## Usage

#### Standalone Lookup

Can be used to query for a specific zip code.

```js
$.ziptastic(48867, function(country, state, stateCode, city, zip) {
  // Match found.
});
```

#### Input Keyup Wrapper

```js
$('input.zip')
  .ziptastic()
  .on('zipChange', function(event, country, state, stateCode, city, zip) {
    // Match found.
  });
```
