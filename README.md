## Usage

### Standalone lookup

Can be used to query for a specific zip code.

    $.ziptastic(48867, function(country, state, city, zip){
        // Use the data...
    })

### Element Selector

    $('#zip')
        .ziptastic()
        .on('zipChange', function(event, country, state, city, zip) {
            // Use the data...
        });

## Notes
    Currently the database is US only. Next addition is Canada. We will try and get that added this weekend :)