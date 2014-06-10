## Usage

### Standalone lookup

Can be used to query for a specific zip code.

    $.ziptastic(48867, function(country, state, state_short, city, zip){
        // Use the data...
    })

### Element Selector

    $('#zip')
        .ziptastic()
        .on('zipChange', function(event, country, state, state_short, city, zip) {
            // Use the data...
        });
