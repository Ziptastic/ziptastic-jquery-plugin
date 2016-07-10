(function( $ ) {
	var requests = {};
	var zipValid = {
		us: /[0-9]{5}(-[0-9]{4})?/
	};
    var protocol = '';
    if (location.protocol == 'file:') {
        protocol = 'https://';
    } else {
        protocol = location.protocol;
    }
	var referrer = document.location.origin + document.location.pathname;

 	$.ziptastic = function(country, zip, key, callback) {
		country = country || 'US';
		if (!key) {
			alert("Please register for an API key at GetZiptastic.com.");
			return;
		}

		country = country.toUpperCase();
		if(!requests[country]) {
			requests[country] = {};
		}

		if(!requests[country][zip]) {
			requests[country][zip] = $.ajax({
				url: protocol + '//zip.getziptastic.com/v3/' + country + '/' + zip,
				headers: {'x-referrer': referrer, 'x-key': key},
				contentType: "application/json",
				type: 'GET',
				dataType: 'json',
				success: function(data) { requests[country][zip] = data[0]; },
				error: function(e) { console.log('There was an error. ' + e.message ); }
			});

			// Bind to the finished request
			requests[country][zip].done(function(data) {

				if (typeof callback == 'function') {
					var data_temp = data
					var key = Object.keys(data_temp)[0];

					requests[country][zip] = data_temp[key];
					callback(data_temp[key].country, data_temp[key].state,
							 data_temp[key].state_short, data_temp[key].city, zip);
				}
			});
		}
		// Allow for binding to the deferred object
		return requests[country][zip];
	};

	$.reverseZiptastic = function(latitude, longitude, key, callback) {
		var request = $.ajax({
		   url: protocol + '//zip.getziptastic.com/v3/reverse/' + latitude + '/' + longitude + '/5000',
		   headers: {'x-referrer': referrer, 'x-key': key},
		   contentType: "application/json",
		   type: 'GET',
		   dataType: 'json',
		   error: function(e) { console.log('There was an error. ' + e.message ); }
	   });

	   request.done(function(data) {
		   if (typeof callback == 'function') {
			   callback(data[0].country, data[0].state,
						data[0].state_short, data[0].city, zip);
		   }
	   });
	}

	$.fn.ziptastic = function( options ) {
		return this.each(function() {
			var ele = $(this);
            if (options.reverseGeo == true) {
                var geoSuccess = function(position) {
                    $.reverseZiptastic(position.coords.latitude, position.coords.longitude, options.key, function(country, state, state_short, city){
                        ele.trigger('zipChange', [country, state, state_short, city, zip]);
                    });
                }

                var geoError = function(e) {
                    error(e);
                }

                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
                } else {
                   console.log('Geolocation is not supported by your browser.');
                }

            } else {

    			ele.on('keyup change', function() {
    				var zip = ele.val();
        			if(zipValid.us.test(zip)) {
        				$.ziptastic(options.country, zip, options.key, function(country, state, state_short, city) {
        					// Trigger the updated information
        					ele.trigger('zipChange', [country, state, state_short, city, zip]);
        				});
        			}
    			});
            }
		});
	};
})( jQuery );
