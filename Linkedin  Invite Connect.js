




var connections_query_selector = ".scaffold-finite-scroll__content li a";
var arrURL=[];
var count = 0;
document.querySelectorAll(people_query_selector).forEach((item) => {
 count = count + 1; 
    //console.log(url);
    //not considering the duplicate
	if(count%2 == 0)
	{
		// console.log(count);
        var url = item.href;
        console.log(url);
		// temp = temp + "\n"+ url;
        arrURL.push(url);
	}

});



var delaycount = 0;

arrURL.forEach((uurl) => {
   
    setTimeout(() => {
        console.log("Delayed for "+ delaycount + " seconds.");
        window.open(uurl, "_blank");
      }, delaycount);

      delaycount = delaycount + 6000;
});
