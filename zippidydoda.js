(function( $ ) {
  $.fn.ziptastic = function( options ) {
  	
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'zip' 	  : 'zip',	
      'cityid'    : 'city',
      'stateid'   : 'state',
      'countryid' : 'country'
    }, options);	

	var zip_element = $("#" + settings.zipid);

	var city_element = $("#" + settings.cityid);
	var state_element = $("#" + settings.stateid);
	var country_element = $("#" + settings.countryid);

	// Hide the elements that we're going to retreive data for.
	city_element.parent().hide();
	
	state_element.parent().hide();
	
	country_element.parent().hide();
	

    $('#zip').change(function() {
		var client = new XMLHttpRequest();
		client.open("GET", "http://localhost?zip=" + this.value, true);
		client.onreadystatechange = function() {
			if(client.readyState == 4) {
				//alert(client.responseText);
				var location_data = JSON.parse(client.responseText);

				city_element.val(location_data.city);
				city_element.parent().show(500);
				state_element.val(location_data.state);
				state_element.parent().show(500);
				country_element.val(location_data.country);
				country_element.parent().show(500);
		  	};
		};
		  
		client.send();


    });	

	/*


		*/



  };
})( jQuery );