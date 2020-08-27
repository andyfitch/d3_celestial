// JavaScript Document




function  process_location(){
	
	var address = document.getElementById('address_holder');
	var er_pmg = document.getElementById('error_reporting');
	
	if(address.value.trim().length < 5) return;
	
	var address_n = encodeURIComponent(address.value.trim());
	
	var the_button =  document.getElementById('the_button');
	var b_the_button = the_button.innerHTML;
	the_button.innerHTML = '<img style="width: 40px; vertical-align:middle" src="images/loader.gif">'
	er_pmg.innerHTML = "";
	
	var theUrl = "server_code.php?address="+address_n;
	
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			//console.log(xmlHttp.responseText);
			the_button.innerHTML = b_the_button;
            var data = xmlHttp.responseText;
			if(data.substr(0, 7) != 'success'){
				er_pmg.innerHTML = "No location data was found";
				return;
			
			}
			else{
				
				var ndata = data.split(',');
				
				var lat = ndata[1];
				var lon = ndata[2];
				
				if(lat == '' || lat == null){
					
					er_pmg.innerHTML = "No location data was found";
					return;
				}
				
				var lat_el = document.getElementById('lat');
				lat_el.value = lat;
				var lon_el = document.getElementById('lon');
				lon_el.value = lon;
				
				if ("createEvent" in document) {
					var evt = document.createEvent("HTMLEvents");
					evt.initEvent("change", false, true);
					lat_el.dispatchEvent(evt);
					lon_el.dispatchEvent(evt);
				}
				else{
					lat_el.fireEvent("onchange");
					lon_el.fireEvent("onchange")
				}
				
				er_pmg.innerHTML = '<span style="color:#090">'+lat+', '+lon+'</span>';
				
				
				}
			
			
		}
			
   
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}





