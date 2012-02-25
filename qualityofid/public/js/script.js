/* Author:
  Charles F. Munat
*/

$(function() {
  
  // Handle email links
  $('span.at').html('@');
  $('span.grizmo').each(function(index) {
    var t = $(this).text().trim();
    $(this).html("<a href='mailto:" + t + "'>" + t + "</a>");
  });

  // Hide sections to start
  $('.section').hide();
  
  // Force external links to open in a new window
  $('a[rel="external"]').click( function() {
    window.open( $(this).attr('href') );
    return false;
  });
  
  // Handle toggled text
  $('#toggled_text').hide();
  $('#toggle_text').click(function() {
    console.log("toggling..."); console.log($('#toggled_text'));
    $('#toggled_text').slideToggle(400);
    return false;
  });
  
  // Toggle FAQ answer visibility
  var toggleAnswer = function(id) {
    $('#' + id + 'a').slideToggle(400);
  };
  
  $('dl.faq dd').hide();
  $('dl.faq dt').click(function(x) {
    toggleAnswer($(this).attr('id'));
    return false;
  });
  
  // Add router links
  $('a[rel="router"]').click( function(e) {
    console.log(e.target.hash.substr(1));
    router.navigate('/'+e.target.hash.substr(1), true);
    return false;
  });

  // Router to control the navigation between "pages" of the app
  window.Router = Backbone.Router.extend({
    initialize: function() {
      // Using this.route, because order matters
      console.log("+++++ initializing the Router");
    
      this.route(/^(.+)$/, "bookmarkable", this.parseRoute);
      this.route("", "default", this.parseRoute);
    },
  
    parseRoute: function(url) {
      console.log(">>>>> parsing route for " + url);
      
    	var options = {};
  	
    	// split to path and query
    	var halves = url ? url.split('?') : [ '' ];
    	console.log("!!!!! setting the manager to " + halves[0]);
  	
    	// remove the root / if it exists
    	halves[0] = halves[0].substring(0,1) === '/' ? halves[0].substring(1,halves[0].length) : halves[0];
  	
    	// split the path
    	var pathparts = halves[0].split('/');
  	
    	// if there's a query string, create an options hash from it
      if (halves[1]) {
      	var pairs = halves[1].split('&');
    	
      	for (var j = 0, m = pairs.length; j < m; j++) {
      		var pr = pairs[j].split('=');
      		options[pr[0]] = unescape(pr[1]);
      	}
      }
    
      window.currentPath = pathparts;
      window.currentOptions = options;
    
      console.log(">>>>> currentPath:"); console.log(window.currentPath);
      console.log(">>>>> currentOptions:"); console.log(window.currentOptions);
      
      var id = window.currentPath[0] || 'home';
    
      // switch views
      $('.section').hide();
      $('#' + id).show();
    
      // don't reload the page
      return false;
    }
  });
	    
  // Initialize router
  window.router = new Router();
  
  // Start responding to routes
  Backbone.history.start({pushState: true});
});
