var scroll_count = 7;
var scroll_interval = 3*1000;

//below delay will adjusted based upon the above calculation.
TotalDelay = scroll_count * scroll_interval
console.log(TotalDelay);  


var read_delay = TotalDelay+2000;

var delay_To_start_process_URL =  read_delay+2000;

var delay_Interval_To_OpenURL = 15*1000;



function readFromMain() {
	
	
// var cntt = 0;
document.querySelectorAll(".update-components-actor__container ").forEach((lstElement) => {
			

var result = lstElement.querySelector(".update-components-actor__meta-link .update-components-actor__description").innerText.toLowerCase().trim();

 if (result.indexOf("follower") == -1) {

 	//cntt = cntt + 1;

 	var namee = lstElement.querySelector(".update-components-actor__meta-link span[dir='ltr']>span").innerText.toLowerCase().trim();
	console.log(namee);  

	var link = lstElement.querySelector(".update-components-actor__container a").href;
	console.log(link);  
	 arrURL.push(link);

  }

		});
// console.log(cntt);
	
}

function readFromPeopleContainer() {
	
	// var cntt = 0;
document.querySelectorAll("h2.search-results__cluster-title-bar--x-large").forEach((h2Element) => {

	var headingss = h2Element.innerText.toLowerCase().trim();
	//console.log(headingss);

	 if (headingss == "people") {
			// cntt = cntt + 1;
			var parentss = h2Element.parentElement.parentElement.parentElement ;
		
		parentss.querySelectorAll("ul[role='list'] a").forEach((linkElement) => {

		try {
			var nameee = linkElement.querySelector("span[dir='ltr'] >span").innerText.toLowerCase().trim();
			console.log(nameee); 
			console.log(linkElement.href);
			 arrURL.push(linkElement.href);
    			}
    		catch (err) {
        		//console.log(err);
    			}

		});

	 }  

});
// console.log(cntt);
	
}

var arrURL=[];





 window.addEventListener('load', function() {

	var scroll_delay = 0;
	var verticalpos = 500;
	

	for (var i = 0; i < scroll_count; i++) {
		setTimeout(() => {
			window.scrollTo(0, verticalpos);
			verticalpos = verticalpos + 1000;
		}, scroll_delay);

		scroll_delay = scroll_delay + scroll_interval;

	}

	
		





	setTimeout(() => {
				
				readFromMain();
	
				readFromPeopleContainer ();
	
		}, read_delay);
		
		
	var delay = 0;
	setTimeout(() => {
			arrURL.forEach((uurl) => {
				setTimeout(() => {
					console.log("Delayed for "+ delay + " seconds.");
					window.open(uurl, "_blank");
				}, delay);
				delay = delay + delay_Interval_To_OpenURL;
			}); //arrURL ending here 
	}, delay_To_start_process_URL);
      
      
  
      

});
