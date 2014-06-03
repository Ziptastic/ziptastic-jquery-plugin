(function( $ ) {
	var requests = {};
	var zipValid = {
		us: /[0-9]{5}(-[0-9]{4})?/
	};

	$.ziptastic = function(zip, callback){
		// Only make unique requests
		if(!requests[zip]) {
			requests[zip] = $.getJSON('http://zip.getziptastic.com/v2/US/' + zip);
		}

		// Bind to the finished request
		requests[zip].done(function(data) {
			callback(data.country, data.state, data.state_short, data.city, zip);
		});

		// Allow for binding to the deferred object
		return requests[zip];
	};

	$.fn.ziptastic = function( options ) {
		return this.each(function() {
			var ele = $(this);

			ele.on('keyup', function() {
				var zip = ele.val();

				// TODO Non-US zip codes?
				if(zipValid.us.test(zip)) {
					$.ziptastic(zip, function(country, state, state_short, city) {
						// Trigger the updated information
						ele.trigger('zipChange', [country, state, state_short, city, zip]);
					})
				}
			});
		});
	};
})( jQuery );
