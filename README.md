## Usage

### Standalone lookup

Can be used to query for a specific zip code.

    $.ziptastic(48867, function(country, state, city, zip){
        // Use the data...
    })

### Element Selector

    $('#zip')
        .ziptastic()
        .on('zipChange', function(country, state, city, zip) {
            // Use the data...
        });
