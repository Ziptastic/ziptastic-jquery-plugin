# Official Ziptastic jQuery plugin!
[![Ziptsatic Logo](https://www.getziptastic.com/static/images/ziptastic-logo.png)](https://www.getziptastic.com)

Seamlessly integrate [Ziptastic!](https://www.getziptastic.com) with jQuery

## Usage

#### Standalone Lookup

Can be used to query for a specific zip code.

```js
$.ziptastic('US', 48867, 'your-api-key-here', function(country, state, stateCode, city, zip) {
  console.log(country, state, stateCode, city, zip);
});
```

#### Input Keyup Wrapper with forward geocoding (postal code)

```js
var duration = 500;

var elements = {
    country: $('#country'),
    state: $('#state'),
    state_short: $('#state-short'),
    city: $('#city'),
    zip: $('#zip')
}

// Initially hide the city/state/zip
elements.country.parent().hide();
elements.state.parent().hide();
elements.state_short.parent().hide();
elements.city.parent().hide();

var options = {
    "key": "<your-api-key-here>",
    "country": "US"
}
elements.zip.ziptastic(options)
    .on('zipChange', function(evt, country, state, state_short, city, zip) {
        // Country
        elements.country.val(country).parent().show(duration);

        // State
        elements.state_short.val(state_short).parent().show(duration);
        elements.state.val(state).parent().show(duration);

        // City
        elements.city.val(city).parent().show(duration);
    });
});
```

#### Using Reverse Geocoding

Just set `reverseGeo` to `true` in the `options` object.

```js
var options = {
    "key": "<your-api-key-here>",
    "reverseGeo": true,
    "country": "US"
}
```
