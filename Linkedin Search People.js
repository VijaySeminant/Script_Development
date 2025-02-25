console.log("hello");

var arrURL =[];

var scroll_count = 2;
var scroll_interval = 3*1000;
TotalDelay = scroll_count * scroll_interval

var read_delay = TotalDelay+2000;

var delay_Interval_To_OpenURL = 6*1000;

var mainSelector = ".search-results-container ul[role='list'] li";

function read_all_link() {
   
   document.querySelectorAll(mainSelector).forEach((lstElement) => {
   
      try {
         var link = lstElement.querySelector("a").href;
         console.log(link);
         arrURL.push(link);
      }
    	catch (err) 
    	{
        		console.log(err);
    	}
   
   });
   
}


window.addEventListener('load', function() {
   
   console.log("processing Linkedin People Search");

	var scroll_delay = 0;
	var verticalpos = 0;
	var delay = 0;

	for (var i = 0; i < scroll_count; i++) {
		setTimeout(() => {
		   
		   verticalpos = verticalpos + 1000;
			window.scrollTo(0, verticalpos);
			
		}, scroll_delay);

		scroll_delay = scroll_delay + scroll_interval;

	}
	

	setTimeout(() => {
				
				read_all_link();
				
				arrURL.forEach((uurl) => {
   				setTimeout(() => {
   					console.log("Delayed for "+ delay + " seconds.");
   					window.open(uurl, "_blank");
   				}, delay);
   				delay = delay + delay_Interval_To_OpenURL;
			   }); //arrURL ending here 
			   
	}, read_delay);
		
		
	

  
      

});